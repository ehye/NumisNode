import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'

import About from './components/About'
import Home from './components/Home'
import SubjectList from './components/SubjectList'
import SubjectInfo from './components/SubjectInfo'
import Login from './components/Login'
import User from './components/User'
import './App.css'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

const padding = {
  paddingRight: 5,
}

interface jwt {
  iat: number
  id: string
  username: string
  name: string
}

// without library
function parseJwt(token: string): jwt {
  const base64Url: string = token.split('.')[1]
  const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload: string = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

const App = () => {
  const [token, setToken] = useState('')
  const [jwt, setJwt] = useState<jwt>()
  const client = useApolloClient()

  loadDevMessages()
  loadErrorMessages()

  useEffect(() => {
    const userToken = localStorage.getItem('user-token')
    if (userToken) {
      setToken(userToken)
      setJwt(parseJwt(userToken))
    }
  }, [])

  const logout = () => {
    setToken('')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div className="App">
      <Router>
        <div>
          <Link style={padding} to="/">
            Home
          </Link>
          <Link style={padding} to="/subjects">
            Explore
          </Link>
          <Link style={padding} to="/about">
            About
          </Link>
          {jwt && (
            <>
              <Link to={`/user/${jwt.id}`}>Hi! {jwt.name} </Link>
              <a href="" onClick={logout}>
                Log out
              </a>
            </>
          )}
          {!token && (
            <Link style={padding} to="/login">
              Log in
            </Link>
          )}
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          {!token && <Route path="/login" element={<Login setToken={setToken} />} />}
          <Route path="/user/:id" element={token ? <User /> : <Navigate replace to="/login" />} />
          <Route path="/subjects" element={<SubjectList />} />
          <Route path="/subject/:id" element={<SubjectInfo />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/create" element={<CreateNew addNew={addNew} />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
