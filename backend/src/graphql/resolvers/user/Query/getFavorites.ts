import mongoose from 'mongoose'
import { GraphQLError } from 'graphql'
import { User, Subject } from '../../../../models/'
import type { QueryResolvers, Subject as ISubject } from '../../../types/resolvers-types'

export const getFavorites: NonNullable<QueryResolvers['getFavorites']> = async (_parent, _arg, _ctx) => {
  if (!_ctx.userToken?.id) {
    throw new GraphQLError('unauthenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    })
  }

  const favoriteSubjects = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(_ctx.userToken?.id) } },
    { $unwind: '$favorites' },
    { $group: { _id: '$favorites' } },
  ])
  const groupList = await Subject.populate<{ _id: ISubject }>(favoriteSubjects, { path: '_id' })
  return groupList.map(x => x['_id'])
}
