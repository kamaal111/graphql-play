import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './src/graphql/schema.ts',
    generates: {
        './src/graphql/generated/types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                contextType: '../../context#HonoContext',
                useIndexSignature: true,
                maybeValue: 'T | undefined',
                useTypeImports: true,
            },
        },
    },
};

export default config;
