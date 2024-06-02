import {
  IconButton,
  Avatar,
  Flex,
  FlexProps,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorMode,
  Spacer,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { FiMenu, FiBell, FiSun, FiMoon } from 'react-icons/fi'
import Login from './Login'
import { Jwt } from '../App'

interface HeaderProps extends FlexProps {
  user: Jwt | undefined
  signOut: () => void
  onOpenMobileSidebar: () => void
}
const Header = ({ user, signOut, onOpenMobileSidebar }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      ml={{ base: 0, md: 10 }}
      py={{ base: 0, md: 10 }}
      px={{ base: 4, md: 5 }}
      height="10"
      alignItems="center"
      // justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <Text position="fixed" hideBelow="md" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        NumisNode
      </Text>

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpenMobileSidebar}
        variant="ghost"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Spacer />

      <Flex flexDirection="row" alignItems={'center'}>
        {!user && (
          <>
            <Avatar size={'sm'} cursor={'pointer'} onClick={onOpen} />
            <Login isOpen={isOpen} onClose={onClose} />
          </>
        )}
        {user && (
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} name={user.name} />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem as={ReactRouterLink} to={'/user/' + user.id}>
                Profile
              </MenuItem>
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        )}
        <IconButton
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          aria-label="Toggle Color Mode "
          size="lg"
          variant="ghost"
          onClick={toggleColorMode}
        />
        <IconButton size="lg" variant="ghost" aria-label="open message" icon={<FiBell />} />
      </Flex>
    </Flex>
  )
}

export default Header
