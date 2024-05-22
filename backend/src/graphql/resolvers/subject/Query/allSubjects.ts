import Subject from '../../../../models/subject'
import type { QueryResolvers, Subject as ISubject } from '../../../types/resolvers-types'

export const allSubjects: NonNullable<QueryResolvers['allSubjects']> = async (_parent, _arg, _ctx) => {
  if (_arg.category && _arg.category.length > 0) {
    return await Subject.find({ category: _arg.category }).populate<ISubject>('issuer').limit(100)
  } else {
    return await Subject.find({}).populate<ISubject>('issuer').limit(100)
  }
}
