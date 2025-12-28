import {buildSchema} from 'graphql';

const schema = buildSchema(/* GraphQL */ `
    type Query {
        addTwoNumbers(a: Int!, b: Int!): Int
    }
`);

export default schema;
