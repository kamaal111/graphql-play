import {Hono} from 'hono';
import {showRoutes} from 'hono/dev';

import {withContext} from './context';
import graphqlRouter from './graphql/router';

const app = withContext(new Hono());

app.route('/graphql', graphqlRouter);

showRoutes(app, {verbose: false});

export default app;
