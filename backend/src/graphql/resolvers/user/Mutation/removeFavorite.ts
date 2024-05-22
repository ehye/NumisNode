import mongoose from 'mongoose'
import { GraphQLError } from 'graphql'
import type { MutationResolvers } from '../../../types/resolvers-types'
import { Bookmark, Subject, User } from '../../../../models'

export const removeFavorite: NonNullable<MutationResolvers['removeFavorite']> = async (_parent, _arg, _ctx) => {
  if (!_ctx.userToken) {
    throw new GraphQLError('no auth', { extensions: { code: 'BAD_USER_INPUT' } })
  }

  const subjectId = new mongoose.Types.ObjectId(_arg.id)
  let subject = await Subject.exists({ _id: subjectId })
  if (!subject) {
    throw new GraphQLError('subject not existed', { extensions: { code: 'BAD_USER_INPUT' } })
  }

  const user = await User.exists({ _id: _ctx.userToken.id })
  if (!user) {
    throw new GraphQLError('no user', { extensions: { code: 'BAD_USER_INPUT' } })
  }

  await Bookmark.deleteOne({ subject: _arg.id, user: _ctx.userToken.id })

  const updateResult = await User.findByIdAndUpdate(
    _ctx.userToken.id,
    { $pull: { favorites: subjectId } },
    { new: true }
  )

  return updateResult!.favorites.map(f => f.toString())
}
