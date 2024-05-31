import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Icon,
  Link as ChakraLink,
  Flex,
  useBreakpointValue,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react'
import { FiHome, FiCompass, FiStar } from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Link as ReactRouterLink } from 'react-router-dom'

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

interface NavItemProps extends FlexProps {
  icon: IconType
  to: string
  children: string
  onClose: () => void
}
const NavItem = ({ icon, to, children, onClose }: NavItemProps) => {
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

interface SidebarProps extends BoxProps {
  onClose: () => void
}
const SidebarContent = ({ onClose }: SidebarProps) => {
  return (
    <>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} to={link.to} onClose={onClose}>
          {link.name}
        </NavItem>
      ))}
    </>
  )
}

interface NavProps {
  isOpen: boolean
  onClose: () => void
}
const Nav = ({ isOpen, onClose }: NavProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <>
      {isMobile ? (
        <Drawer
          autoFocus={false}
          placement="top"
          returnFocusOnClose={false}
          size="xs"
          isOpen={isOpen}
          onClose={onClose}
          onOverlayClick={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Box transition="3s ease" pos="fixed" boxShadow="base" w={{ base: 'full', md: 60 }} h="full">
          <SidebarContent onClose={onClose} />
        </Box>
      )}
    </>
  )
}

export default Nav
