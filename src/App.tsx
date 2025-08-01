import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
// import RecruiterLogin from './pages/RecruiterLogin'
// import StudentLogin from './pages/StudentLogin'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/student-login" element={<StudentLogin />} /> */}
      </Routes>
    </Layout>
  )
}