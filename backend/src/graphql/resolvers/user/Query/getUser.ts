import User from '../../../../models/user'
import type { QueryResolvers, NonSensitiveUser as IUser } from '../../../types/resolvers-types'

export const getUser: NonNullable<QueryResolvers['getUser']> = async (_parent, _arg, _ctx) => {
  return await User.findById<IUser>(_arg.id).populate('favorites')
}
