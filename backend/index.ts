import path from 'node:path'
import { debug } from 'node:console'
import express, { Request, Response, NextFunction } from 'express'
import compression from 'compression'
import http from 'http'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { expressMiddleware } from '@apollo/server/express4'
import { apolloServer } from './src/apolloServer'
import * as mongooseClient from './src/mongooseClient'
import { GRAPHQL_URI, JWT_SECRET, REST_API, PORT, IS_PROD, IS_DEV } from './src/utils/config'
import { CustomJwtPayload } from './src/types/AuthContext'
import diaRouter from './src/routers/diagnoses'
import patientsRouter from './src/routers/patients'
import usersRouter from './src/routers/users'

const decodeToken = async (authorization: string | undefined): Promise<CustomJwtPayload | null> => {
  const prefix = 'Bearer '
  if (authorization && authorization.startsWith(prefix)) {
    const decodedToken = jwt.verify(authorization.substring(prefix.length), JWT_SECRET) as CustomJwtPayload
    return { ...decodedToken }
  }

  return null
}

const cleanupFunction =
  (server: http.Server): NodeJS.SignalsListener =>
  () => {
    debug('SIGTERM signal received: closing HTTP server')
    mongooseClient.stop().then(() => {
      debug('mongooseClient closed')
    })
    server.close(() => {
      debug('HTTP server closed')
    })
  }

const start = async () => {
  mongooseClient.start()

  const app = express()
  app.use(compression())
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
        // todo: move to apollo logger
        if (IS_DEV && req.body.operationName != 'IntrospectionQuery') {
          // console.log({ operationName: req.body.operationName, query: req.body.query, variables: req.body.variables })
          console.log({ operationName: req.body.operationName, variables: req.body.variables })
          console.log('------')
        }
        return {
          userToken: await decodeToken(req.headers.authorization),
        }
      },
    })
  )

  if (IS_DEV) {
    app.use((request: Request, _response: Response, next: NextFunction) => {
      console.log('Method:', request.method)
      console.log('Path:  ', request.path)
      console.log('Body:  ', request.body)
      console.log('---')
      next()
    })
  }

  if (!IS_DEV) {
    app.use(express.static(path.join(__dirname, '..', 'dist')))
  }

  app.get(`/health`, (_req, res) => {
    res.status(200).end()
  })

  app.use(`${REST_API}/diagnoses`, diaRouter)
  app.use(`${REST_API}/patients`, patientsRouter)
  app.use(`${REST_API}/users`, usersRouter)

  const server = app.listen(`${PORT}`, () => {
    console.log(`☕ Server running at http://localhost:${PORT}${GRAPHQL_URI}`)
  })

  process.on('SIGTERM', cleanupFunction(server))
}

start()
