import { User } from '../../../../models'
import type { QueryResolvers } from '../../../types/resolvers-types'

export const allUsers: NonNullable<QueryResolvers['allUsers']> = async (_parent, _arg, _ctx) => {
  return await User.find({})
}
