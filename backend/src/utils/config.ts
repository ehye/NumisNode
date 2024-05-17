import 'dotenv/config'

export const MONGODB_URI = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.MONGODB_URI || ''
    case 'development':
      return process.env.DEV_MONGODB_URI || ''
    case 'test':
      return process.env.TEST_MONGODB_URI || ''
    default:
      return ''
  }
}

export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_TEST = process.env.NODE_ENV === 'test'
export const IS_PROD = process.env.NODE_ENV === 'production'

export const ENV = process.env.NODE_ENV

export const JWT_SECRET = 'secret'
export const PORT = process.env.PORT || 3001

export const REST_API = '/api'

export const GRAPHQL_URI = '/_/graphql'
export const GRAPHQL_SCHEMAS = './backend/src/graphql/schemas/'
