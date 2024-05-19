import Subject from '../../../../models/subject'
import type { QueryResolvers, Subject as ISubject } from '../../../types/resolvers-types'

export const getSubject: NonNullable<QueryResolvers['getSubject']> = async (_parent, _arg, _ctx) => {
  return await Subject.findById(_arg.id).populate<ISubject>(['issuer', 'likedBy'])
}
