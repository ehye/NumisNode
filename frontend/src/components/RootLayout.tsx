import { ReactNode } from 'react'
import { useApolloClient } from '@apollo/client'
import { Box, Flex, useColorModeValue, useDisclosure } from '@chakra-ui/react'

import { Jwt } from '../App'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'

interface RootLayoutProps {
  children?: ReactNode
  user: Jwt | undefined
  setUser: React.Dispatch<React.SetStateAction<Jwt | null | undefined>>
}

export default function RootLayout({ children, user, setUser }: RootLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const client = useApolloClient()
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user-token')
    client.resetStore()
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Header user={user} signOut={logout} onOpenMobileSidebar={onOpen} />
      <Nav isOpen={isOpen} onClose={onClose} />

      <Flex direction="column">
        <Box flex="1" overflowY="auto" ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
  )
}
