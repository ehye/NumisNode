import { Bookmark } from '../../../../models'
import Subject from '../../../../models/subject'
import type { QueryResolvers, Subject as ISubject } from '../../../types/resolvers-types'
import { GraphQLError } from 'graphql'

export const getSubject: NonNullable<QueryResolvers['getSubject']> = async (_parent, _arg, _ctx) => {
  const subject = await Subject.findById(_arg.id).populate<ISubject>('issuer')
  if (subject == null) {
    throw new GraphQLError('Create failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        error: 'no such subject',
      },
    })
  }

  const liked = await Bookmark.exists({ subject: _arg.id, user: _ctx.userToken?.id }).lean()
  const likesCount = await Bookmark.countDocuments({ subject: _arg.id })

  return {
    id: subject.id,
    title: subject.title,
    category: subject.category,
    issuer: subject.issuer,
    max_year: subject.max_year,
    min_year: subject.min_year,
    obverse_thumbnail: subject.obverse_thumbnail,
    reverse_thumbnail: subject.reverse_thumbnail,
    likesCount: likesCount,
    liked: liked != null,
  }
}
