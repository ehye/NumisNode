import { Issuer } from '../../../../models'
import type { QueryResolvers } from '../../../types/resolvers-types'

export const allIssuers: NonNullable<QueryResolvers['allIssuers']> = async (_parent, _arg, _ctx) => {
  return await Issuer.find({})
}
