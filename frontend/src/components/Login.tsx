import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { graphql } from '../gql'
import { useMutation } from '@apollo/client'

const loginMutation = graphql(/* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`)

const Login = ({ setToken }: { setToken: React.Dispatch<React.SetStateAction<string>> }) => {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('secret')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const [login, { data }] = useMutation(loginMutation, {
    onError: exception => {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 3 * 1000)
    },
  })

  useEffect(() => {
    if (data) {
      const token = data.login?.value
      if (token) {
        setToken(token)
        localStorage.setItem('user-token', token)
        navigate('/')
        window.location.reload()
      }
    }
  }, [data, setToken, navigate])

  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    username && password && (await login({ variables: { username, password } }))
  }

  return (
    <div>
      <form>
        <div>
          username <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button onClick={submit}>login</button>
        <div>{errorMessage}</div>
      </form>
    </div>
  )
}

export default Login
