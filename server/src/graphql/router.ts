import {graphqlServer} from '@hono/graphql-server';
import {Hono} from 'hono';

import schema from './schema';
import resolver from './resolver';

const graphqlRouter = new Hono();

graphqlRouter.use('/', graphqlServer({schema, rootResolver: resolver, graphiql: true}));

export default graphqlRouter;
