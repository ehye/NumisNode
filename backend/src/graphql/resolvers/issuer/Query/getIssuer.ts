import { Issuer } from '../../../../models'
import type { QueryResolvers } from '../../../types/resolvers-types'

export const getIssuer: NonNullable<QueryResolvers['getIssuer']> = async (_parent, _arg, _ctx) => {
  return await Issuer.findById(_arg.id)
}
