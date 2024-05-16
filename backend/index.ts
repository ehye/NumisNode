import { debug } from 'node:console'
import express from 'express'
import http from 'http'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { expressMiddleware } from '@apollo/server/express4'
import { apolloServer } from './src/apolloServer'
import * as mongooseClient from './src/mongooseClient'

import { GRAPHQL_URI, JWT_SECRET, REST_API } from './src/utils/config'
import { CustomJwtPayload } from './src/types/AuthContext'
import diaRouter from './src/routers/diagnoses'
import patientsRouter from './src/routers/patients'
import usersRouter from './src/routers/users'

const start = async () => {
  mongooseClient.start()

  const app = express()
  const httpServer = http.createServer(app)
  const apollo = await apolloServer(httpServer)

  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  console.log('🚀 Starting Apollo Server...')
  await apollo.start()

  app.use(
    GRAPHQL_URI,
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apollo, {
      context: async ({ req }) => {
        if (req.body.variables) {
          console.log({ operationName: req.body.operationName, variables: req.body.variables ?? '' })
        }
        return {
          currentUser: await getCurrentUserContext(req.headers.authorization),
        }
      },
    })
  )

  app.get(`${REST_API}/ping`, (_req, res) => {
    console.log('someone pinged here')
    res.send('pong')
  })

  app.use(`${REST_API}/diagnoses`, diaRouter)
  app.use(`${REST_API}/patients`, patientsRouter)
  app.use(`${REST_API}/users`, usersRouter)

  const server = app.listen(3001, () => {
    console.log(`🚀 Server running at http://localhost:3001${GRAPHQL_URI}`)
  })

  process.on('SIGTERM', cleanupFunction(server))
}

start()

const getCurrentUserContext = async (authorization: string | undefined): Promise<CustomJwtPayload | null> => {
  const prefix = 'Bearer '
  if (authorization && authorization.startsWith(prefix)) {
    const decodedToken = jwt.verify(authorization.substring(prefix.length), JWT_SECRET) as CustomJwtPayload
    console.log('decodedToken:', decodedToken)
    return { ...decodedToken }
  }

  return null
}

const cleanupFunction =
  (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>): NodeJS.SignalsListener =>
  () => {
    debug('Closing HTTP server...')
    mongooseClient.stop().then(() => {
      debug('mongooseClient closed')
    })

    server.close(() => {
      debug('HTTP server closed')
    })
  }
