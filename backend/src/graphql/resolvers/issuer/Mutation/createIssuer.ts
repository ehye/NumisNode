import { GraphQLError } from 'graphql'
import { v4 as uuid } from 'uuid'
import { Issuer } from '../../../../models'
import type { MutationResolvers } from '../../../types/resolvers-types'

export const createIssuer: NonNullable<MutationResolvers['createIssuer']> = async (_parent, _arg, _ctx) => {
  const issuer = new Issuer({ ..._arg.input, id: uuid() })
  try {
    await issuer.save()
  } catch (error) {
    throw new GraphQLError('Create failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        error,
      },
    })
  }
  return issuer
}
