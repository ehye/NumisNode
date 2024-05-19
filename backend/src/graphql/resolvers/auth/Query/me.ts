import type { QueryResolvers } from '../../../types/resolvers-types'

export const me: NonNullable<QueryResolvers['me']> = (_parent, _arg, _ctx) => {
  return { ..._ctx.userToken }
}
