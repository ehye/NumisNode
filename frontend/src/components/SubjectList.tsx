import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { graphql } from '../gql'
import { Card, CardBody, Stack, Heading, Text, Image, HStack, Box, SimpleGrid, Skeleton } from '@chakra-ui/react'

const allSubjectsWithVariablesQuery = graphql(/* GraphQL */ `
  query AllSubjects($category: String) {
    allSubjects(category: $category) {
      id
      title
      obverse_thumbnail
      reverse_thumbnail
    }
  }
`)

const SubjectList = ({ category }: { category?: string }) => {
  const location = useLocation()

  const { data, error, loading, refetch } = useQuery(allSubjectsWithVariablesQuery, {
    variables: { category },
  })

  useEffect(() => {
    refetch()
  }, [location.key, refetch])

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div>
      {data && (
        <SimpleGrid minChildWidth="320px" spacingX={2} spacingY="15px">
          {data.allSubjects?.map((subject, i) => (
            <Box key={`subject-${i}`}>
              <Skeleton m={5} isLoaded={!loading}>
                <Card maxW="sm">
                  <CardBody>
                    <Link to={`/subject/${subject.id}`}>
                      <HStack>
                        <Image maxW="50%" src={subject.obverse_thumbnail ?? undefined} />
                        <Image maxW="50%" src={subject.reverse_thumbnail ?? undefined} />
                      </HStack>
                    </Link>
                    <Stack mt="6" spacing="3">
                      <Link to={`/subject/${subject.id}`}>
                        <Heading size="md">{subject.title}</Heading>
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel aliquet ante, non commodo
                          purus.
                        </Text>
                      </Link>
                    </Stack>
                  </CardBody>
                  {/* <CardFooter></CardFooter> */}
                </Card>
              </Skeleton>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </div>
  )
}

SubjectList.query = allSubjectsWithVariablesQuery

export default SubjectList
