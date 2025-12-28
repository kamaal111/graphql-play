import assert from 'node:assert/strict';

import type {RootResolver} from '@hono/graphql-server';

import type {HonoContext} from '../context';
import {type GraphQLResolveInfo} from 'graphql';
import {isFieldRequested} from './utils';
import type {Author, Book} from './generated/types';

const authors: Author[] = [
    {id: '1', name: 'Kate Chopin'},
    {id: '2', name: 'Paul Auster'},
];

const books: Book[] = [
    {id: '1', title: 'The Awakening', authorId: '1'},
    {id: '2', title: 'City of Glass', authorId: '2'},
];

function resolveBooks(info: GraphQLResolveInfo, ...parentFields: string[]): Book[] {
    const unwrappedParentFields = parentFields ?? [];
    const authorRequested = isFieldRequested(info, ...unwrappedParentFields.concat(['author']));
    if (!authorRequested) return books;

    const selectedAuthors = resolveAuthors(info, ...unwrappedParentFields.concat(['author'])).reduce<
        Record<string, Author>
    >((acc, author) => ({...acc, [author.id]: author}), {});
    const authorBooksRequested = isFieldRequested(info, ...unwrappedParentFields.concat(['author', 'books']));

    return books.map(book => {
        const author = selectedAuthors[book.authorId];
        assert(author != null);

        const mappedBook: Book = {...book, author};
        if (!authorBooksRequested) return mappedBook;

        const authorBooks = [mappedBook]
            .concat(books.filter(({authorId, id}) => authorId === author.id && id !== mappedBook.id))
            .toSorted((a, b) => Number(a.id) - Number(b.id));

        return {...mappedBook, author: {...author, books: authorBooks}};
    });
}

function resolveAuthors(info: GraphQLResolveInfo, ...parentFields: string[]): Author[] {
    const unwrappedParentFields = parentFields ?? [];
    const booksAreRequested = isFieldRequested(info, ...unwrappedParentFields.concat(['books']));
    if (!booksAreRequested) return authors;

    const resolvedBooks = Object.groupBy(
        resolveBooks(info, ...unwrappedParentFields.concat(['books'])),
        ({authorId}) => authorId
    );

    return authors.map(author => {
        const books = resolvedBooks[author.id] ?? [];

        return {...author, books: books};
    });
}

const resolver: RootResolver = () => {
    return {
        books: (_params: unknown, _c: HonoContext, info: GraphQLResolveInfo) => resolveBooks(info),
        authors: (_params: unknown, _c: HonoContext, info: GraphQLResolveInfo) => resolveAuthors(info),
    };
};

export default resolver;
