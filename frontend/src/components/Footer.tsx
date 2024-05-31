import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        py={4}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© {new Date().getFullYear()} NumisNode</Text>
      </Container>
    </Box>
  )
}

export default Footer
