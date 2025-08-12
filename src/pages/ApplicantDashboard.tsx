import React from 'react'
import { Title, Text, Container, Button } from '@mantine/core'
import { logout } from '../utils/auth'

export default function ApplicantDashboard() {
  const handleLogout = () => {
    logout()
  }

  return (
    <Container>
      <Title
        style={{
          fontSize: '32pt',
          textAlign: 'justify',
          color: 'var(--color-neutral)',
        }}
      >
        <br /> Applicant Dashboard
      </Title>

      <Text
        style={{
          fontSize: '16pt',
          lineHeight: 1.5,
          textAlign: 'justify',
          color: 'black',
        }}
      >
        <br /> Welcome to your applicant dashboard! Here you can manage your profile, view job opportunities, and track your applications. <br /><br />
        This is a placeholder page that will be expanded with full functionality in future updates.
      </Text>

      <br />
      <Button 
        onClick={handleLogout}
        className="transparent-button"
        style={{ marginTop: '2rem' }}
      >
        Logout
      </Button>
    </Container>
  )
}