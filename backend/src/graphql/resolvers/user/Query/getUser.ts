// import { ISubject } from '../../../../models/subject'
import User, { IUser } from '../../../../models/user'
import type { QueryResolvers, Subject as ISubject } from '../../../types/resolvers-types'

export const getUser: NonNullable<QueryResolvers['getUser']> = async (_parent, _arg, _ctx) => {
  return await User.findById(_arg.id)
  // .populate('friends')
  // .populate({ path: 'friends', populate: 'favorites' })
}
