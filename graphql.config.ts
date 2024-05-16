require('dotenv').config()
import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  schema: `https://localhost:${process.env.PORT}`,
}

export default config
