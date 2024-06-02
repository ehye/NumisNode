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

let testServer: ApolloServer

before(async () => {
  const typeDefs = await readFilesRecursively(GRAPHQL_SCHEMAS, '.graphql')
  testServer = new ApolloServer({ typeDefs, resolvers })

  mongooseClient.start()

  await mongooseClient.dropCollection('issuers')
})

describe('Issuer: ', () => {
  const variables: MutationCreateIssuerArgs = {
    input: {
      code: faker.lorem.word(),
      name: faker.lorem.word(),
      wikidata_id: faker.internet.url(),
    },
  }

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
      variables: { ...variables },
    })

    assert(response.body.kind === 'single')
    assert.strictEqual(response.body.singleResult.errors, undefined)
    assert.notEqual(response.body.singleResult.data?.createIssuer.id, null || undefined)
    assert.strictEqual(response.body.singleResult.data?.createIssuer.code, variables.input.code)
    assert.strictEqual(response.body.singleResult.data?.createIssuer.name, variables.input.name)
    assert.strictEqual(response.body.singleResult.data?.createIssuer.wikidata_id, variables.input.wikidata_id)
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
      variables: { ...variables },
    })

    assert(response.body.kind === 'single')
    assert.strictEqual(response.body.singleResult.errors, undefined)
    assert.strictEqual(response.body.singleResult.data?.allIssuers.at(0)?.name, variables.input.name)
    assert.strictEqual(response.body.singleResult.data?.allIssuers.at(0)?.code, variables.input.code)
    assert.strictEqual(response.body.singleResult.data?.allIssuers.at(0)?.wikidata_id, variables.input.wikidata_id)
  })
})

after(async () => {
  await testServer.stop()
  await mongooseClient.stop()
})
