import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'
import type { MutationResolvers } from '../../../types/resolvers-types'
import { randomString } from '../../../../utils/utils'
import { User } from '../../../../models'

export const createUser: NonNullable<MutationResolvers['createUser']> = async (_parent, _arg, _ctx) => {
  const passwordHash = await bcrypt.hash(_arg.input.password, 10)
  const user = new User({
    username: _arg.input.username,
    passwordHash,
    name: randomString(),
  })
  try {
    await user.save()
  } catch (error) {
    throw new GraphQLError('Create failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        error,
      },
    })
  }

  return { id: user.id, name: user.name, username: user.username }
}
