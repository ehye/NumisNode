import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'
import SubjectList from './SubjectList'

it('should renders subjects', async () => {
  const mocks = [
    {
      request: {
        query: SubjectList.query,
      },
      result: {
        data: {
          allSubjects: [
            {
              id: '66408fc2a656cb722c3bb1e5',
              title: '5 Cents - Victoria',
            },
            {
              id: '66408ff6a656cb722c3bb1e9',
              title: '5 Cents - Edward VII',
            },
          ],
        },
      },
    },
  ]

  render(
    <MemoryRouter initialEntries={['/some-route']}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <SubjectList />
      </MockedProvider>
    </MemoryRouter>
  )
  expect(await screen.findByText('5 Cents - Edward VII')).toBeInTheDocument()
  expect(await screen.findByText('5 Cents - Victoria')).toBeInTheDocument()
})
