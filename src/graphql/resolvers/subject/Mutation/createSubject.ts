import { GraphQLError } from 'graphql'
import { v4 as uuid } from 'uuid'
import { Subject } from '../../../../models'
import type { MutationResolvers } from '../../../types/resolvers-types'
import { IIssuer } from '../../../../models/issuer'

export const createSubject: NonNullable<MutationResolvers['createSubject']> = async (_parent, _arg, _ctx) => {
  const subject = new Subject({ ..._arg.input, id: uuid() })
  try {
    await subject.save()
  } catch (error) {
    throw new GraphQLError('Create failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        error,
      },
    })
  }
  return await subject.populate<{ issuer: IIssuer }>('issuer')
}
