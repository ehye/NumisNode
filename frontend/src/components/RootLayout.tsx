import { ReactNode } from 'react'
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link as ChakraLink,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react'
import { FiHome, FiCompass, FiStar } from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

import { Jwt } from '../App'
import Header from './Header'

interface LinkItemProps {
  name: string
  to: string
  icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, to: '/' },
  { name: 'Explore', icon: FiCompass, to: '/subjects' },
  { name: 'About', icon: FiStar, to: '/about' },
]

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          NumisNode
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} to={link.to} onClose={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  to: string
  children: string
  onClose: () => void
}
const NavItem = ({ icon, to, children, onClose, ...rest }: NavItemProps) => {
  return (
    <ChakraLink
      as={ReactRouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={onClose}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  )
}

export default function RootLayout({
  children,
  user,
  setUser,
}: {
  children?: ReactNode
  user: Jwt | undefined
  setUser: React.Dispatch<React.SetStateAction<Jwt | null | undefined>>
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const client = useApolloClient()
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user-token')
    client.resetStore()
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />

      {/* mobile sidebar */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Header user={user} signOut={logout} onOpenMobileSidebar={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}
