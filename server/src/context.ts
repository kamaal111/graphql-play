import type {Context, Hono, Input} from 'hono';
import {requestId, type RequestIdVariables} from 'hono/request-id';

import {loggingMiddleware} from './middleware/logging';

const REQUEST_ID_HEADER_NAME = 'graphql-request-id';

type HonoVariables = RequestIdVariables;

interface HonoEnvironment {
    Variables: HonoVariables;
}

export type HonoContext<P extends string = string, I extends Input = Record<string, unknown>> = Context<
    HonoEnvironment,
    P,
    I
>;

export function withContext(app: Hono) {
    return app.use(requestId({headerName: REQUEST_ID_HEADER_NAME})).use(loggingMiddleware);
}
