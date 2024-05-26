import { useState, useEffect } from 'react'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import About from './components/About'
import Home from './components/Home'
import SubjectList from './components/SubjectList'
import SubjectInfo from './components/SubjectInfo'
import RootLayout from './components/RootLayout'
import User from './components/User'

export type Jwt = {
  iat: number
  id: string
  username: string
  name: string
} | null

// without library
function parseJwt(token: string): Jwt {
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
  const [user, setUser] = useState<Jwt>()

  loadDevMessages()
  loadErrorMessages()

  useEffect(() => {
    const userToken = localStorage.getItem('user-token')
    if (userToken) {
      setUser(parseJwt(userToken))
    }
  }, [])

  const router = createBrowserRouter([
    {
      element: <RootLayout children={<Outlet />} user={user} setUser={setUser} />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/subjects',
          element: <SubjectList />,
        },
        {
          path: 'subject/:id',
          element: <SubjectInfo userId={user?.id} />,
        },
        {
          path: '/user/:id',
          element: <User />,
        },
        {
          path: '/about',
          element: <About />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
