import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { graphql } from '../gql'

const allSubjectsWithVariablesQuery = graphql(/* GraphQL */ `
  query AllSubjects($category: String) {
    allSubjects(category: $category) {
      id
      title
      obverse_thumbnail
      reverse_thumbnail
    }
  }
`)

const SubjectList = ({ category }: { category?: string }) => {
  const location = useLocation()

  const { data, error, loading, refetch } = useQuery(allSubjectsWithVariablesQuery, {
    variables: { category },
  })

  useEffect(() => {
    refetch()
  }, [location.key, refetch])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <div>
      {data && (
        <ul>
          {data.allSubjects?.map((subject, i) => (
            <div key={`subject-${i}`}>
              <Link to={`/subject/${subject.id}`}>
                <img src={subject.obverse_thumbnail ?? ''} />
                <p>{subject.title}</p>
              </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  )
}

SubjectList.query = allSubjectsWithVariablesQuery

export default SubjectList
