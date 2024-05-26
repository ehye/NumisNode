import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { graphql } from '../gql'
import { useQuery, useMutation } from '@apollo/client'

const SUBJECT_INFO_DOCUMENT = graphql(/* GraphQL */ `
  query GetSubject($getSubjectId: String!) {
    getSubject(id: $getSubjectId) {
      id
      title
      category
      min_year
      max_year
      obverse_thumbnail
      reverse_thumbnail
      liked
      likesCount
    }
  }
`)

const ADD_FAVORITE = graphql(/* GraphQL */ `
  mutation AddFavorite($addFavoriteId: String!) {
    addFavorite(id: $addFavoriteId)
  }
`)

const REMOVE_FAVORITE = graphql(/* GraphQL */ `
  mutation RemoveFavorite($removeFavoriteId: String!) {
    removeFavorite(id: $removeFavoriteId)
  }
`)

const SubjectInfo = ({ userId }: { userId?: string }) => {
  const { id } = useParams()
  const [liked, setLiked] = useState(false)

  const { data, loading } = useQuery(SUBJECT_INFO_DOCUMENT, {
    variables: { getSubjectId: id ?? '' },
    onCompleted: () => {
      setLiked(data?.getSubject?.liked ?? false)
    },
  })

  const [addLike] = useMutation(ADD_FAVORITE, {
    refetchQueries: [SUBJECT_INFO_DOCUMENT],
    onError: error => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    },
    onCompleted: ({ addFavorite }) => {
      console.log('onCompleted addFavorite:', addFavorite, ' this sub:', id)
      setLiked(true)
    },
  })

  const [removeLike] = useMutation(REMOVE_FAVORITE, {
    refetchQueries: [SUBJECT_INFO_DOCUMENT],
    onError: error => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    },
    onCompleted: ({ removeFavorite }) => {
      console.log('onCompleted removeFavorite:', removeFavorite, ' this sub:', id)
      setLiked(false)
    },
  })

  async function handleLike() {
    if (!id) {
      return
    }
    if (!userId) {
      alert('Log in first')
      return
    }
    if (liked) {
      await removeLike({ variables: { removeFavoriteId: id } })
    } else {
      await addLike({ variables: { addFavoriteId: id } })
    }
  }

  if (loading) {
    return <div>loading...</div>
  }

  const subject = data?.getSubject
  return (
    <div>
      {subject && (
        <div>
          <p>{subject?.title}</p>
          <p>{subject?.category}</p>
          <p>
            {subject?.min_year}~{subject?.max_year}
          </p>
          <div>
            <img src={subject?.obverse_thumbnail ?? ''} />
            <img src={subject?.reverse_thumbnail ?? ''} />
          </div>
          {!liked && <button onClick={handleLike}>{subject.likesCount} Like</button>}
          {liked && <button onClick={handleLike}>{subject.likesCount} Unlike</button>}
        </div>
      )}
    </div>
  )
}

export default SubjectInfo
