import { User } from '../../../../models'
import type { Issuer, QueryResolvers, Subject, User as UserType } from '../../../types/resolvers-types'

export const getUser: NonNullable<QueryResolvers['getUser']> = async (_parent, _arg, _ctx) => {
  const user = await User.findById(_arg.id)
    .populate<{ favorites: Array<{ issuer: Issuer }> }>({
      path: 'favorites',
      populate: 'issuer',
    })
    .populate<{
      friends: Array<{
        id: string
        username: string
        name: string
        favorites: Array<{ id: string; title: string; issuer: Issuer }>
      }>
    }>({
      path: 'friends',
      populate: 'favorites',
    })
  console.log('user:', user)

  return user
}
