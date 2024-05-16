import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'
import { JWT_SECRET } from '../../../../utils/config'
import { User } from '../../../../models'

import type { MutationResolvers } from '../../../types/resolvers-types'

export const login: NonNullable<MutationResolvers['login']> = async (_parent, _arg, _ctx) => {
  const user = await User.findOne({ username: _arg.username })
  const isPasswordCorrect = user === null ? false : await bcrypt.compare(_arg.password, user.passwordHash)

  if (!user || !isPasswordCorrect) {
    throw new GraphQLError('wrong credentials', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    })
  }

  return {
    value: jwt.sign(
      {
        id: user._id,
        username: user.username,
        name: user.name,
      },
      JWT_SECRET,
    ),
  }
}
