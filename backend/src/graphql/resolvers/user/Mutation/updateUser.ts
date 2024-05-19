import { GraphQLError } from 'graphql'
import { User } from '../../../../models'
import type { MutationResolvers } from '../../../types/resolvers-types'

export const updateUser: NonNullable<MutationResolvers['updateUser']> = async (_parent, _arg, _ctx) => {
  if (_ctx.userToken?.id !== _arg.input.id) {
    throw new GraphQLError('unauthenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        invalidArgs: _arg.input,
      },
    })
  }
  let user = await User.findById(_arg.input.id)
  if (!user) {
    throw new GraphQLError('not such user', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: _arg.input.id,
      },
    })
  }
  user.name = _arg.input.name ?? user.name
  try {
    await user.save()
  } catch (error) {
    throw new GraphQLError('Updating failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        error,
      },
    })
  }
  return { id: user.id, name: user.name, username: user.username }
}
