import React, { useState } from 'react'
import { Title, Text, Container, TextInput, PasswordInput, Button, Alert, Space } from '@mantine/core'
import classes from './Login.module.css'

export default function ApplicantLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080'
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        const userRole = data.user?.role || 'unknown'
        
        console.log('User logged in as:', userRole)
        console.log('Full user data:', data.user)

        // Validate that the user role matches the login page
        if (userRole !== 'applicant') {
          setError('This account is not an applicant account. Please use the recruiter login.')
          setLoading(false)
          return
        }

        setSuccess('Login successful!')
        localStorage.setItem('applicantToken', data.token)
        localStorage.setItem('userType', 'applicant')
        window.location.href = '/applicant/dashboard'
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className={classes.loginContainer}>
      <Title className={classes.loginTitle}>
        Applicant Login
      </Title>

      <div className={classes.loginForm}>
        {error && (
          <Alert color="red" className={classes.alertMessage}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="green" className={classes.alertMessage}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={classes.formInput}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={classes.formInput}
          />

          <Button
            type="submit"
            loading={loading}
            className={`transparent-button ${classes.submitButton}`}
          >
            Log In as Applicant
          </Button>
        </form>

        <Text className={classes.linkText}>
          Don't have an account?{' '}
          <a href="/applicant-signup">
            Sign up here
          </a>
        </Text>

        <Text className={classes.linkText}>
          Are you a recruiter?{' '}
          <a href="/recruiter-login">
            Login here
          </a>
        </Text>
      </div>
    </Container>
  )
}