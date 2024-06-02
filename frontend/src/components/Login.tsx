import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { graphql } from '../gql'
import { useMutation } from '@apollo/client'
import { Button, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'

const loginMutation = graphql(/* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`)

interface loginProps {
  isOpen: boolean
  onClose: () => void
}

const Login = ({ isOpen, onClose }: loginProps) => {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('secret')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

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
        localStorage.setItem('user-token', token)
        // navigate('/')
        window.location.reload()
      }
    }
  }, [data, navigate])

  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    username && password && (await login({ variables: { username, password } }))
  }

  return (
    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>username</FormLabel>
            <Input value={username} onChange={({ target }) => setUsername(target.value)} ref={initialRef} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>password</FormLabel>
            <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </FormControl>
          <div>{errorMessage}</div>
          <Button onClick={submit} colorScheme="blue" mr={3} minW="100%" mt={30}>
            Log in
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Login
