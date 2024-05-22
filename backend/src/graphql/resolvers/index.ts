import type { Resolvers } from '../types/resolvers-types'
import { addFavorite } from './user/Mutation/addFavorite'
import { removeFavorite } from './user/Mutation/removeFavorite'
import { createIssuer } from './issuer/Mutation/createIssuer'
import { createSubject } from './subject/Mutation/createSubject'
import { createUser } from './user/Mutation/createUser'
import { login } from './auth/Mutation/login'
import { updateIssuer } from './issuer/Mutation/updateIssuer'
import { updateSubject } from './subject/Mutation/updateSubject'
import { updateUser } from './user/Mutation/updateUser'
import { allIssuers } from './issuer/Query/allIssuers'
import { allSubjects } from './subject/Query/allSubjects'
import { allUsers } from './user/Query/allUsers'
import { getFavorites } from './user/Query/getFavorites'
import { getIssuer } from './issuer/Query/getIssuer'
import { getSubject } from './subject/Query/getSubject'
import { getUser } from './user/Query/getUser'
import { me } from './auth/Query/me'

import { DateTimeResolver } from 'graphql-scalars'

export const resolvers: Resolvers = {
  Query: {
    allIssuers,
    allSubjects,
    allUsers,
    getIssuer,
    getSubject,
    getUser,
    getFavorites,
    me,
  },
  Mutation: {
    addFavorite,
    removeFavorite,
    createIssuer,
    createSubject,
    createUser,
    login,
    updateIssuer,
    updateSubject,
    updateUser,
  },

  DateTime: DateTimeResolver,
}
