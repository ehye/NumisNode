import {
  IconButton,
  Avatar,
  Button,
  Flex,
  FlexProps,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react'
import { FiMenu, FiBell, FiSun, FiMoon } from 'react-icons/fi'
import Login from './Login'
import { Jwt } from '../App'

interface HeaderProps extends FlexProps {
  user: Jwt | undefined
  signOut: () => void
  onOpenMobileSidebar: () => void
}
const Header = ({ user, signOut, onOpenMobileSidebar, ...rest }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      py={{ base: 0, md: 10 }}
      px={{ base: 4, md: 5 }}
      height="10"
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpenMobileSidebar}
        variant="ghost"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        NumisNode
      </Text>

      <HStack spacing={{ base: '10', md: '4' }}>
        <IconButton
          onClick={toggleColorMode}
          size="lg"
          variant="ghost"
          aria-label="Toggle Color Mode "
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
        />
        <IconButton size="lg" variant="ghost" aria-label="open message" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          {!user && (
            <Popover trigger="hover" placement="bottom">
              <PopoverTrigger>
                <div>
                  {!user && <Avatar size={'sm'} />}
                  {user && (
                    <Avatar
                      size={'sm'}
                      src={
                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      }
                    />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  <Button colorScheme="blue" onClick={onOpen} minW="100%">
                    Log in
                  </Button>
                  <Login isOpen={isOpen} onClose={onClose} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}

          {user && (
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem as="a" href={'/user/' + user.id}>
                  Profile
                </MenuItem>
                <MenuItem onClick={signOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </HStack>
    </Flex>
  )
}

export default Header
