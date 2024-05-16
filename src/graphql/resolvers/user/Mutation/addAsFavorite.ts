import { GraphQLError } from 'graphql'
import type { MutationResolvers } from '../../../types/resolvers-types'
import { User } from '../../../../models'

const {
  Types: { ObjectId: ObjectId },
} = require('mongoose')

export const addAsFavorite: NonNullable<MutationResolvers['addAsFavorite']> = async (_parent, _arg, _ctx) => {
  const currentUser = await User.findById(_ctx.currentUser?.id).populate<{ favorites: Array<{ id: string }> }>('favorite', {
    id: 1,
  })
  if (!currentUser) {
    throw new GraphQLError('wrong credentials', {
      extensions: { code: 'BAD_USER_INPUT' },
    })
  }

  const subjectId = new ObjectId(_arg.id)
  if (!currentUser.favorites.includes(subjectId)) {
    currentUser.favorites.push(subjectId)
    await currentUser.save()
  }

  return true
}
