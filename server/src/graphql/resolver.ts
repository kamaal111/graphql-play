import type {RootResolver} from '@hono/graphql-server';

import type {HonoContext} from '../context';

const resolver: RootResolver = (_c: HonoContext) => {
    return {
        addTwoNumbers: (args: {a: number; b: number}) => {
            console.log('🐸🐸🐸 args', args);
            return args.a + args.b;
        },
    };
};

export default resolver;
