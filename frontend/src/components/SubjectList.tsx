import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { graphql, FragmentType, useFragment } from '../gql'
// import Subject, { SubjectFragment } from './Subject'

const allSubjectsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query AllSubjects($category: String) {
    allSubjects(category: $category) {
      ...SubjectThumbItem
    }
  }
`)

const SubjectThumbFragment = graphql(/* GraphQL */ `
  fragment SubjectThumbItem on Subject {
    id
    title
    # category
    # max_year
    # min_year
    obverse_thumbnail
    reverse_thumbnail
  }
`)

type SubjectThumbProps = {
  subject: FragmentType<typeof SubjectThumbFragment>
}

const SubjectThumb = (props: SubjectThumbProps) => {
  const subject = useFragment(SubjectThumbFragment, props.subject)

  return (
    <div>
      <div>
        <Link to={`/subject/${subject.id}`}>{subject.title}</Link>
      </div>
      <img src={subject.obverse_thumbnail ?? ''} />
    </div>
  )
}

const SubjectList = () => {
  // `data` is typed!
  const { data, loading } = useQuery(allSubjectsWithVariablesQueryDocument, {
    variables: {},
  })
  if (loading) {
    return <div>loading...</div>
  }

  return (
    <>
      {data && (
        <ul>
          {data.allSubjects?.map(
            (subject, i) =>
              //   subject &&  <Subject key={`subject-${i}`} subject={subject} />
              subject && <SubjectThumb key={`subject-${i}`} subject={subject} />
          )}
        </ul>
      )}
    </>
  )
}

export default SubjectList
