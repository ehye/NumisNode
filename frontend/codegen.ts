import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../backend/src/graphql/schemas/*.graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        skipTypename: true,
        nonOptionalTypename: true,
      },
    },
  },
}

export default config
