import { Types } from 'mongoose'
import { GraphQLError } from 'graphql'
import type { MutationResolvers } from '../../../types/resolvers-types'
import { Subject, User } from '../../../../models'

export const addAsFavorite: NonNullable<MutationResolvers['addAsFavorite']> = async (_parent, _arg, _ctx) => {
  if (!_ctx.userToken) {
    throw new GraphQLError('no auth', { extensions: { code: 'BAD_USER_INPUT' } })
  }

  const subjectId = new Types.ObjectId(_arg.id)
  const subject = await Subject.findById(subjectId)
  if (!subject) {
    throw new GraphQLError('subject not existed', { extensions: { code: 'BAD_USER_INPUT' } })
  }

  const userId = new Types.ObjectId(_ctx.userToken.id)
  const currentUser = await User.exists(userId)
  if (!currentUser) {
    throw new GraphQLError('no user', { extensions: { code: 'BAD_USER_INPUT' } })
  }

  const userHasBeenLiked = await Subject.exists({ _id: subjectId, likedBy: userId })
  if (!userHasBeenLiked) {
    
    subject.likesCount == undefined ? (subject.likesCount = 1) : (subject.likesCount += 1)
    subject.likedBy.push(userId)
    await subject.save()
  }

  return true
}
