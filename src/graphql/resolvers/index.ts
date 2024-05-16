import type { Resolvers } from '../types/resolvers-types'
import { addAsFavorite } from './user/Mutation/addAsFavorite'
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
    me,
  },
  Mutation: {
    addAsFavorite,
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
