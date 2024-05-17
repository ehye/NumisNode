import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './About'
import Home from './Home'
import SubjectList from './SubjectList'
import SubjectInfo from './SubjectInfo'

const padding = {
  paddingRight: 5,
}

export const Menu = () => {
  return (
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
        <Link style={padding} to="/login">
          Login
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subjects" element={<SubjectList />} />
        <Route path="/subject/:id" element={<SubjectInfo />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/create" element={<CreateNew addNew={addNew} />} /> */}
      </Routes>
    </Router>
  )
}
