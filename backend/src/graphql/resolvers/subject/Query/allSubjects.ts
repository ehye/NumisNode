import { Subject } from '../../../../models'
import type { QueryResolvers, Issuer } from '../../../types/resolvers-types'

export const allSubjects: NonNullable<QueryResolvers['allSubjects']> = async (_parent, _arg, _ctx) => {
  if (_arg.category && _arg.category.length > 0) {
    return await Subject.find({ category: { $eq: _arg.category } }).populate<{ issuer: Issuer }>('issuer')
  } else {
    return await Subject.find({}).populate<{ issuer: Issuer }>('issuer')
  }
}
