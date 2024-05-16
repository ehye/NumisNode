require('dotenv').config()

const MONGODB_URI = (process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI) || ''
const PORT = process.env.PORT || 3001
const REST_API = '/api'
const APOLLO_SERVER = '/_/graphql'
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const ENV = process.env.NODE_ENV
const IS_DEV = process.env.NODE_ENV === 'development'
const GRAPHQL_SCHEMAS = './src/graphql/schemas/'

export { MONGODB_URI, PORT, REST_API, APOLLO_SERVER, JWT_SECRET, ENV, IS_DEV as IS_DEBUG,GRAPHQL_SCHEMAS }
