import { useParams } from 'react-router-dom'
import { graphql } from '../gql'
import { useQuery } from '@apollo/client'

const subjectInfoDocument = graphql(/* GraphQL */ `
  query GetSubject($getSubjectId: String!) {
    getSubject(id: $getSubjectId) {
      id
      title
      category
      min_year
      max_year
      obverse_thumbnail
      reverse_thumbnail
    }
  }
`)

const SubjectInfo = () => {
  const { id } = useParams()

  const { data, loading } = useQuery(subjectInfoDocument, {
    variables: { getSubjectId: id ?? '' },
  })

  if (loading) {
    return <div>loading...</div>
  }
  const subject = data?.getSubject
  return (
    <div>
      {data && (
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
          <div>
            <button>Favorite</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubjectInfo
