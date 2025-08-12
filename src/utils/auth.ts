export const getAuthToken = () => {
  const userType = localStorage.getItem('userType')
  if (userType === 'applicant') {
    return localStorage.getItem('applicantToken')
  } else if (userType === 'recruiter') {
    return localStorage.getItem('recruiterToken')
  }
  return null
}

export const getUserType = () => {
  return localStorage.getItem('userType')
}

export const getUserRole = () => {
  // Map frontend userType to backend role - now they match
  const userType = localStorage.getItem('userType')
  return userType // both 'applicant' and 'recruiter' match backend
}

export const isAuthenticated = () => {
  return !!getAuthToken()
}

export const logout = () => {
  localStorage.removeItem('applicantToken')
  localStorage.removeItem('recruiterToken')
  localStorage.removeItem('userType')
  window.location.href = '/'
}

export const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  const userType = getUserType()
  
  if (!token) {
    throw new Error('No authentication token found')
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}