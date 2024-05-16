import 'dotenv/config'

export const MONGODB_URI = (process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI) || ''
export const IS_DEV = process.env.NODE_ENV === 'development'
export const ENV = process.env.NODE_ENV

export const JWT_SECRET = 'secret'

export const REST_API = '/api'

export const GRAPHQL_URI = '/_/graphql'
export const GRAPHQL_SCHEMAS = './backend/src/graphql/schemas/'
