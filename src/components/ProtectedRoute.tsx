import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated, getUserType } from '../utils/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: 'applicant' | 'recruiter'
}

export default function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const authenticated = isAuthenticated()
  const userType = getUserType()

  // If not authenticated, redirect to home
  if (!authenticated) {
    return <Navigate to="/" replace />
  }

  // If specific user type is required and doesn't match, redirect to appropriate dashboard
  if (requiredUserType && userType !== requiredUserType) {
    if (userType === 'applicant') {
      return <Navigate to="/applicant/dashboard" replace />
    } else if (userType === 'recruiter') {
      return <Navigate to="/recruiter/dashboard" replace />
    }
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}