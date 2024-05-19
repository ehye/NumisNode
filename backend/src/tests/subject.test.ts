import { test, after, afterEach, before, beforeEach, describe } from 'node:test'
import assert from 'node:assert/strict'
import * as mongooseClient from '../mongooseClient'
import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { resolvers } from '../graphql/resolvers'
import { Subject, MutationCreateSubjectArgs } from '../graphql/types/resolvers-types'
import { readFilesRecursively } from '../utils/files'
import { GRAPHQL_SCHEMAS } from '../utils/config'
import { faker } from '@faker-js/faker'

const input: MutationCreateSubjectArgs = {
  input: {
    category: faker.lorem.word(),
    title: faker.lorem.word(),
    issuer: faker.database.mongodbObjectId(),
    max_year: faker.number.int({ min: 1000, max: 2000 }),
    min_year: faker.number.int({ min: 1000, max: 2000 }),
    obverse_thumbnail: faker.internet.url(),
    reverse_thumbnail: faker.internet.url(),
  },
}

let typeDefs: string
let testServer: ApolloServer

before(async () => {
  typeDefs = await readFilesRecursively(GRAPHQL_SCHEMAS, '.graphql')
  testServer = new ApolloServer({ typeDefs, resolvers })

  mongooseClient.start()

  mongooseClient.dropCollection('subjects')
})

describe('Subject: ', () => {
  test('add 1 subject', async () => {
    const response = await testServer.executeOperation<{ createSubject: Subject }>({
      query: gql`
        mutation CreateSubject($input: SubjectCreate!) {
          createSubject(input: $input) {
            id
            title
            category
            min_year
            max_year
            obverse_thumbnail
            reverse_thumbnail
          }
        }
      `,
      variables: { ...input },
    })

    assert(response.body.kind === 'single')
    assert.strictEqual(response.body.singleResult.errors, undefined)
    assert.notEqual(response.body.singleResult.data?.createSubject.id, null || undefined)
    assert.strictEqual(response.body.singleResult.data?.createSubject.category, input.input.category)
    assert.strictEqual(response.body.singleResult.data?.createSubject.title, input.input.title)
    assert.strictEqual(response.body.singleResult.data?.createSubject.max_year, input.input.max_year)
    assert.strictEqual(response.body.singleResult.data?.createSubject.min_year, input.input.min_year)
    assert.strictEqual(response.body.singleResult.data?.createSubject.obverse_thumbnail, input.input.obverse_thumbnail)
    assert.strictEqual(response.body.singleResult.data?.createSubject.reverse_thumbnail, input.input.reverse_thumbnail)
  })

  test('should has 1 subject', async () => {
    const response = await testServer.executeOperation<{ allSubjects: Array<Subject> }>({
      query: gql`
        query AllSubjects {
          allSubjects {
            id
            title
            category
            min_year
            max_year
            obverse_thumbnail
            reverse_thumbnail
            likesCount
          }
        }
      `,
    })

    assert(response.body.kind === 'single')
    assert.strictEqual(response.body.singleResult.errors, undefined)
    assert.strictEqual(response.body.singleResult.data?.allSubjects.length, 1)
    assert.strictEqual(response.body.singleResult.data?.allSubjects[0].likesCount, 0)
  })
})

after(async () => {
  mongooseClient.stop()
})
