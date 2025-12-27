import assert from 'node:assert';

import {makeGrafastSchema} from 'grafast';

import {add} from './steps/add';

const schema = makeGrafastSchema({
    typeDefs: /* GraphQL */ `
        type Query {
            addTwoNumbers(a: Int!, b: Int!): Int
        }
    `,
    objects: {
        Query: {
            plans: {
                addTwoNumbers(_, fieldArgs) {
                    const {$a, $b} = fieldArgs;
                    assert($a != null && $b != null);

                    return add($a, $b);
                },
            },
        },
    },
});

export default schema;
