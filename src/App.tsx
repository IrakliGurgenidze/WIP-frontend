import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import RecruiterLogin from './pages/RecruiterLogin'
import ApplicantLogin from './pages/ApplicantLogin'
import RecruiterSignup from './pages/RecruiterSignup'
import ApplicantSignup from './pages/ApplicantSignup'
import ApplicantDashboard from './pages/ApplicantDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import CandidateSearch from './pages/CandidateSearch'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  console.log('Backend URL:', import.meta.env.VITE_BACKEND_BASE_URL);
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/applicant-login" element={<ApplicantLogin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
        <Route path="/applicant-signup" element={<ApplicantSignup />} />
        
        {/* Protected Routes */}
        <Route 
          path="/applicant/dashboard" 
          element={
            <ProtectedRoute requiredUserType="applicant">
              <ApplicantDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recruiter/dashboard" 
          element={
            <ProtectedRoute requiredUserType="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recruiter/candidates" 
          element={
            <ProtectedRoute requiredUserType="recruiter">
              <CandidateSearch />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Layout>
  )
}