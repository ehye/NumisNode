import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { graphql } from '../gql'
import { useQuery } from '@apollo/client'
import UserCollection from './UserCollection'

const GET_USER = graphql(/* GraphQL */ `
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      username
      name
      createdAt
      updatedAt
      favorites {
        id
        title
      }
    }
  }
`)

const User = () => {
  const { id } = useParams()
  const location = useLocation()

  const { data, loading, refetch } = useQuery(GET_USER, {
    variables: { getUserId: id ?? '' },
  })

  useEffect(() => {
    refetch()
  }, [location.key, refetch])

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
