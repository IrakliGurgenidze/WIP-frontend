import React, { useState } from 'react'
import { Title, Text, Container, TextInput, PasswordInput, Button, Alert } from '@mantine/core'
import classes from './Login.module.css'

export default function ApplicantSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080'
      const response = await fetch(`${backendUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          role: 'applicant' // Backend expects 'applicant'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...')
        // Redirect to applicant login after 2 seconds
        setTimeout(() => {
          window.location.href = '/applicant-login'
        }, 2000)
      } else {
        setError(data.message || 'Signup failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className={classes.loginContainer}>
      <Title className={classes.loginTitle}>
        Applicant Signup
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

        <form onSubmit={handleSignup}>
          <TextInput
            label="Email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
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

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={classes.formInput}
          />

          <Button
            type="submit"
            loading={loading}
            className={`transparent-button ${classes.submitButton}`}
          >
            Sign Up as Applicant
          </Button>
        </form>

        <Text className={classes.linkText}>
          Already have an account?{' '}
          <a href="/applicant-login">
            Log in here
          </a>
        </Text>

        <Text className={classes.linkText}>
          Are you a recruiter?{' '}
          <a href="/recruiter-signup">
            Sign up here
          </a>
        </Text>
      </div>
    </Container>
  )
}