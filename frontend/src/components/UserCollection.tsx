import { Link } from 'react-router-dom'
import { SetStateAction, useState } from 'react'
import type { Subject } from '../../src/gql/graphql'

export default function FilterableList({ source }: { source: Array<Subject> }) {
  const [query, setQuery] = useState('')

  function handleChange(e: { target: { value: SetStateAction<string> } }) {
    setQuery(e.target.value)
  }

  return (
    <>
      <SearchBar query={query} onChange={handleChange} />
      <hr />
      {source.map((subject, i) => {
        if (subject.title?.includes(query)) {
          return (
            <Link to={`/subject/${subject.id}`} key={i}>
              {subject.title}
            </Link>
          )
        }
      })}
    </>
  )
}

const SearchBar = ({ query, onChange }: { query: string; onChange: React.ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <label>
      Search: <input value={query} onChange={onChange} />
    </label>
  )
}
