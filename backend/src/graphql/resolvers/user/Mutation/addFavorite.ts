import mongoose from 'mongoose'
import { GraphQLError } from 'graphql'
import type { MutationResolvers, NonSensitiveUser as IUser, Subject as ISubject } from '../../../types/resolvers-types'
import { Bookmark, Subject, User } from '../../../../models'

export const addFavorite: NonNullable<MutationResolvers['addFavorite']> = async (_parent, _arg, _ctx) => {
  if (!_ctx.userToken) {
    throw new GraphQLError('no auth', { extensions: { code: 'BAD_USER_INPUT' } })
  }

  const subject = await Subject.exists({ _id: _arg.id })
  if (!subject) {
    throw new GraphQLError('subject not existed', { extensions: { code: 'BAD_USER_INPUT' } })
  }

  const user = await User.findById(_ctx.userToken.id)
  if (!user) {
    throw new GraphQLError('no user', { extensions: { code: 'BAD_USER_INPUT' } })
  }

  const subjectId = new mongoose.Types.ObjectId(_arg.id)
  if (!user.favorites.includes(subjectId)) {
    user.favorites.push(subjectId)
    await user.save()

    const bookmark = new Bookmark({
      user: _ctx.userToken.id,
      subject: _arg.id,
    })
    await Bookmark.create(bookmark)
  }

  return user.favorites.map(f => f.toString())
}
