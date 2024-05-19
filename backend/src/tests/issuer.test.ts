import { test, after, afterEach, before, beforeEach, describe } from 'node:test'
import assert from 'node:assert/strict'
import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { resolvers } from '../graphql/resolvers'
import { Issuer, MutationCreateIssuerArgs } from '../graphql/types/resolvers-types'
import * as mongooseClient from '../mongooseClient'
import { readFilesRecursively } from '../utils/files'
import { GRAPHQL_SCHEMAS } from '../utils/config'
import { faker } from '@faker-js/faker'

let typeDefs: string
let testServer: ApolloServer

const input: MutationCreateIssuerArgs = {
  input: {
    code: faker.lorem.word(),
    name: faker.lorem.word(),
    wikidata_id: faker.internet.url(),
  },
}

before(async () => {
  typeDefs = await readFilesRecursively(GRAPHQL_SCHEMAS, '.graphql')
  testServer = new ApolloServer({ typeDefs, resolvers })

  mongooseClient.start()

  mongooseClient.dropCollection('issuers')
})

describe('Issuer: ', () => {
  test('add 1 issuer', async () => {
    const response = await testServer.executeOperation<{ createIssuer: Issuer }>({
      query: gql`
        mutation CreateIssuer($input: IssuerCreate!) {
          createIssuer(input: $input) {
            id
            code
            name
            wikidata_id
          }
        }
      `,
      variables: { ...input },
    })

    assert(response.body.kind === 'single')
    assert.strictEqual(response.body.singleResult.errors, undefined)
    assert.notEqual(response.body.singleResult.data?.createIssuer.id, null || undefined)
    assert.strictEqual(response.body.singleResult.data?.createIssuer.code, input.input.code)
    assert.strictEqual(response.body.singleResult.data?.createIssuer.name, input.input.name)
    assert.strictEqual(response.body.singleResult.data?.createIssuer.wikidata_id, input.input.wikidata_id)
  })

  test('should has 1 issuer', async () => {
    const response = await testServer.executeOperation<{ allIssuers: Array<Issuer> }>({
      query: gql`
        query AllIssuers {
          allIssuers {
            id
            code
            name
            wikidata_id
            createdAt
            updatedAt
          }
        }
      `,
      variables: { ...input },
    })

    assert(response.body.kind === 'single')
    assert.strictEqual(response.body.singleResult.errors, undefined)
    assert.strictEqual(response.body.singleResult.data?.allIssuers.length, 1)
  })
})

after(async () => {
  mongooseClient.stop()
})
