import {buildSchema} from 'graphql';

const schema = buildSchema(/* GraphQL */ `
    type Book {
        id: String!
        title: String!
        author: Author
        authorId: String!
    }

    type Author {
        id: String!
        name: String!
        books: [Book]
    }

    type Query {
        books: [Book!]!
        authors: [Author!]!
    }
`);

export default schema;
