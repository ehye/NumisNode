import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
} from '@chakra-ui/react'
import { graphql } from '../gql'
import { useQuery, useMutation } from '@apollo/client'

const SUBJECT_INFO_DOCUMENT = graphql(/* GraphQL */ `
  query GetSubject($getSubjectId: String!) {
    getSubject(id: $getSubjectId) {
      id
      title
      category
      min_year
      max_year
      obverse_thumbnail
      reverse_thumbnail
      liked
      likesCount
    }
  }
`)

const ADD_FAVORITE = graphql(/* GraphQL */ `
  mutation AddFavorite($addFavoriteId: String!) {
    addFavorite(id: $addFavoriteId)
  }
`)

const REMOVE_FAVORITE = graphql(/* GraphQL */ `
  mutation RemoveFavorite($removeFavoriteId: String!) {
    removeFavorite(id: $removeFavoriteId)
  }
`)

const SubjectInfo = ({ userId }: { userId?: string }) => {
  const { id } = useParams()
  const [liked, setLiked] = useState(false)

  const { data, loading } = useQuery(SUBJECT_INFO_DOCUMENT, {
    variables: { getSubjectId: id ?? '' },
    onCompleted: () => {
      setLiked(data?.getSubject?.liked ?? false)
    },
  })

  const [addLike] = useMutation(ADD_FAVORITE, {
    refetchQueries: [SUBJECT_INFO_DOCUMENT],
    onError: error => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    },
    onCompleted: ({ addFavorite }) => {
      console.log('onCompleted addFavorite:', addFavorite, ' this sub:', id)
      setLiked(true)
    },
  })

  const [removeLike] = useMutation(REMOVE_FAVORITE, {
    refetchQueries: [SUBJECT_INFO_DOCUMENT],
    onError: error => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    },
    onCompleted: ({ removeFavorite }) => {
      console.log('onCompleted removeFavorite:', removeFavorite, ' this sub:', id)
      setLiked(false)
    },
  })

  async function handleLike() {
    if (!id) {
      return
    }
    if (!userId) {
      alert('Log in first')
      return
    }
    if (liked) {
      await removeLike({ variables: { removeFavoriteId: id } })
    } else {
      await addLike({ variables: { addFavoriteId: id } })
    }
  }

  if (loading || data?.getSubject == null) {
    return <div>loading...</div>
  }

  const subject = data.getSubject

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 24 }}>
        <Flex maxWidth="50%">
          <Image
            maxBlockSize="200px"
            // objectFit='cover'
            // rounded={'md'}
            // fit={'cover'}
            // align={'center'}
            // w={'100%'}
            // h={{ base: '100%', sm: '400px', lg: '500px' }}
            src={subject.obverse_thumbnail ?? ''}
          />
          <Image
            maxBlockSize="200px"
            // rounded={'md'}
            // fit={'cover'}
            // align={'center'}
            // w={'100%'}
            // h={{ base: '100%', sm: '400px', lg: '500px' }}
            src={subject.reverse_thumbnail ?? ''}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {subject.title}
            </Heading>
            <Text fontWeight={300} fontSize={'2xl'}>
              {subject.min_year}~{subject.max_year}
            </Text>
          </Box>

          <Stack spacing={{ base: 4, sm: 6 }} direction={'column'} divider={<StackDivider />}>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={'2xl'} fontWeight={'300'}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore
              </Text>
              <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet at delectus doloribus dolorum
                expedita hic, ipsum maxime modi nam officiis porro, quae, quisquam quos reprehenderit velit? Natus,
                totam.
              </Text>
            </VStack>
            <Box>
              <Text fontSize={{ base: '16px', lg: '18px' }} fontWeight={'500'} textTransform={'uppercase'} mb={'4'}>
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti-magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>
          </Stack>
          {!liked && (
            <Button w={'full'} mt={8} size={'lg'} py={'7'} onClick={handleLike}>
              {subject.likesCount} Likes
            </Button>
          )}
          {liked && (
            <Button w={'full'} mt={8} size={'lg'} py={'7'} onClick={handleLike}>
              {subject.likesCount} Unlike
            </Button>
          )}
        </Stack>
      </SimpleGrid>
    </Container>
  )
}

export default SubjectInfo
