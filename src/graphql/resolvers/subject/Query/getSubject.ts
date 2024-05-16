import { Subject } from '../../../../models'
import type { QueryResolvers, Issuer } from '../../../types/resolvers-types'

export const getSubject: NonNullable<QueryResolvers['getSubject']> = async (_parent, _arg, _ctx) => {
  // type NewType = {
  //   issuer: {
  //     id: string
  //     name: string
  //     code: string
  //     wikidata_id: string
  //     createdAt: Date
  //     updatedAt: Date
  //   }
  // }

  return await Subject.findById(_arg.id).populate<{ issuer: Issuer }>('issuer')
}
