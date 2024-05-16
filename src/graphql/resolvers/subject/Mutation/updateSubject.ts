import { GraphQLError } from 'graphql'
import { Subject } from '../../../../models'
import type { MutationResolvers } from '../../../types/resolvers-types'
import { IIssuer } from '../../../../models/issuer'

const {
  Types: { ObjectId: ObjectId },
} = require('mongoose')

export const updateSubject: NonNullable<MutationResolvers['updateSubject']> = async (_parent, _arg, _ctx) => {
  let subject = await Subject.findById(_arg.input.id)
  if (!subject) {
    throw new GraphQLError('not such subject', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: _arg.input.id,
      },
    })
  }

  subject.category = _arg.input.category ?? subject.category
  subject.max_year = _arg.input.max_year ?? subject.max_year
  subject.min_year = _arg.input.min_year ?? subject.min_year
  subject.obverse_thumbnail = _arg.input.obverse_thumbnail ?? subject.obverse_thumbnail
  subject.reverse_thumbnail = _arg.input.reverse_thumbnail ?? subject.reverse_thumbnail
  subject.title = _arg.input.title ?? subject.title
  subject.issuer = new ObjectId(_arg.input.issuer)

  try {
    await subject.save()
  } catch (error) {
    throw new GraphQLError('Updating failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        error,
      },
    })
  }
  return subject.populate<{ issuer: IIssuer }>('issuer')
}
