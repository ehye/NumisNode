import { test, after, afterEach, before, beforeEach, describe } from 'node:test'
import assert from 'node:assert/strict'
import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { resolvers } from '../graphql/resolvers'
import { User, MutationCreateUserArgs } from '../graphql/types/resolvers-types'
import * as mongooseClient from '../mongooseClient'
import { readFilesRecursively } from '../utils/files'
import { GRAPHQL_SCHEMAS } from '../utils/config'
import { faker } from '@faker-js/faker'

let testServer: ApolloServer

before(async () => {
  const typeDefs = await readFilesRecursively(GRAPHQL_SCHEMAS, '.graphql')
  testServer = new ApolloServer({ typeDefs, resolvers })

  mongooseClient.start()

  await mongooseClient.dropCollection('users')
})

describe('User: ', () => {
  const input: MutationCreateUserArgs = {
    input: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    },
  }

  test('add 1 user', async () => {
    const response = await testServer.executeOperation<{ createUser: User }>({
      query: gql`
        mutation CreateUser($input: UserCreate!) {
          createUser(input: $input) {
            id
            username
            name
          }
        }
      `,
      variables: { ...input },
    })

    assert(response.body.kind === 'single')
    assert.strictEqual(response.body.singleResult.errors, undefined)
    assert.notEqual(response.body.singleResult.data?.createUser.id, null || undefined)
    assert.strictEqual(response.body.singleResult.data?.createUser.username, input.input.username)
  })

  test('should has 1 issuer', async () => {
    const response = await testServer.executeOperation<{ allUsers: Array<User> }>({
      query: gql`
        query AllUsers {
          allUsers {
            id
            username
            name
          }
        }
      `,
    })

    assert(response.body.kind === 'single')
    assert.strictEqual(response.body.singleResult.errors, undefined)
    assert.strictEqual(response.body.singleResult.data?.allUsers.length, 1)
  })
})

after(async () => {
  await testServer.stop()
  await mongooseClient.stop()
})
