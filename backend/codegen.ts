import { GRAPHQL_SCHEMAS } from './src/utils/config'
import type { CodegenConfig } from '@graphql-codegen/cli'
// import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files/src'

const config: CodegenConfig = {
  schema: `${GRAPHQL_SCHEMAS}*.graphql`,

  // // server-preset
  // generates: {
  //   './src/schemas': defineConfig({
  //     // typeDefsFileMode: 'modules',
  //     // resolverRelativeTargetDir: '../resolvers',
  //     // resolverMainFile: '../__generated__/resolvers.generated.ts',
  //     // resolverTypesPath: '../__generated__/types.generated.ts',
  //     typeDefsFilePath: false,
  //     resolverGeneration: {
  //       query: '*',
  //       mutation: '*',
  //       subscription: '*',
  //       scalar: '*',
  //       object: '', // Empty string disables all file generation of relevant type in every module
  //       union: '*',
  //       interface: '*',
  //     },
  //   }),
  // },

  generates: {
    './backend/src/graphql/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: '../../types/AuthContext#AuthContext',
        // maybeValue: 'T extends PromiseLike<infer U> ? Promise<U | null> : T | null',
        // mappers: {
        //   User: './../src/models/user#IUser',
        // },
      },
      // preset: 'graphql-modules',
      // presetConfig: {
      //   requireRootResolvers: true,
      //   baseTypesPath: '../types/graphql.ts',
      //   filename: 'generated-types/module-types.ts',
      // },
    },
  },

  // // typescript-mongodb
  // generates: {
  //   './src/types/graphql.ts': {
  //     plugins: ['typescript', 'typescript-mongodb'],
  //     config: {
  //       useIndexSignature: true,
  //       contextType: './src/types/types#AuthContext',
  //     },
  //   },
  // },

  require: ['ts-node/register'],
}

export default config
