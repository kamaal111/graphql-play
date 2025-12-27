import {grafast} from 'grafast';

import schema from './schema';

const result = await grafast({
    schema,
    source: /* GraphQL */ `
        {
            addTwoNumbers(a: 40, b: 2)
        }
    `,
});

console.log(JSON.stringify(result, null, 2));
