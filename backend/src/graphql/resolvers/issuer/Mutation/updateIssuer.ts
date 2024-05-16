import { GraphQLError } from 'graphql'
import { Issuer } from '../../../../models'
import type { MutationResolvers } from '../../../types/resolvers-types'

export const updateIssuer: NonNullable<MutationResolvers['updateIssuer']> = async (_parent, _arg, _ctx) => {
  let issuer = await Issuer.findById(_arg.input.id)
  if (!issuer) {
    throw new GraphQLError('not such issuer', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: _arg.input.id,
      },
    })
  }

  issuer.name = _arg.input.name ?? issuer.name
  issuer.wikidata_id = _arg.input.wikidata_id ?? issuer.wikidata_id

  try {
    await issuer.save()
  } catch (error) {
    throw new GraphQLError('Updating failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        error,
      },
    })
  }
  return issuer
  // return {
  //   id: issuer.id,
  //   code: issuer.code,
  //   name: issuer.name,
  //   wikidata_id: issuer.wikidata_id,
  // }
}
