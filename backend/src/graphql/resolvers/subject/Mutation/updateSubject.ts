import { GraphQLError } from 'graphql'
import { Subject } from '../../../../models'
import type { MutationResolvers, Issuer } from '../../../types/resolvers-types'

export const updateSubject: NonNullable<MutationResolvers['updateSubject']> = async (_parent, _arg, _ctx) => {
  try {
    const updateResult = await Subject.findByIdAndUpdate(_arg.input.id, _arg.input, {
      new: true,
      runValidators: true,
      context: 'query',
    }).populate<{ issuer: Issuer }>('issuer')

    if (updateResult) {
      return updateResult
    } else {
      throw new GraphQLError('Create failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          error: 'no such subject',
        },
      })
    }
  } catch (error) {
    throw new GraphQLError('Create failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        error,
      },
    })
  }
}
