import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import http from 'http'

import { readFilesRecursively } from './utils/files'
import { AuthContext } from './types/AuthContext'
import { resolvers } from './graphql/resolvers'
import { GRAPHQL_SCHEMAS } from './utils/config'

export async function apolloServer(httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const typeDefs = await readFilesRecursively(GRAPHQL_SCHEMAS, '.graphql')

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer<AuthContext>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })
  return server
}
