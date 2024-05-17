import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import About from './About'

it('renders content', () => {
  render(<About />)

  const element = screen.getByText('About')
  expect(element).toBeDefined()
})
