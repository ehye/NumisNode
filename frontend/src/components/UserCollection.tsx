import { SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'
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
      {source.map(subject => {
        if (subject.title.includes(query)) {
          return (
            <div key={subject.id}>
              <Link to={`/subject/${subject.id}`}>{subject.title}</Link>
            </div>
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
