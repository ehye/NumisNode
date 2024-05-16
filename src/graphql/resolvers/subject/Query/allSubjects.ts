import { Subject } from '../../../../models'
import type { QueryResolvers, Issuer } from '../../../types/resolvers-types'

export const allSubjects: NonNullable<QueryResolvers['allSubjects']> = async (_parent, _arg, _ctx) => {
  return await Subject.find({}).populate<{ issuer: Issuer }>('issuer')
}
