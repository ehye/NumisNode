import { useParams } from 'react-router-dom'
import { graphql } from '../gql'
import { useQuery } from '@apollo/client'
import UserCollection from './UserCollection'

const userInfoDocument = graphql(/* GraphQL */ `
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      username
      name
      favorites {
        id
        title
        category
        max_year
        min_year
      }
    }
  }
`)

const User = () => {
  const { id } = useParams()

  const { data, loading } = useQuery(userInfoDocument, {
    variables: { getUserId: id ?? '' },
  })

  if (loading) {
    return <div>loading...</div>
  }
  const user = data?.getUser

  return (
    <div>
      {user && (
        <div>
          <p>{user.name}</p>
          {user.favorites && (
            <div>
              <h3>Collections ({user.favorites.length})</h3>
              <UserCollection source={user.favorites} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default User
