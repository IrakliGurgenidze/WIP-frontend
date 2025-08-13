import React, { useState, useEffect } from 'react'
import { 
  Title, 
  Text, 
  Container, 
  Button, 
  Card, 
  TextInput, 
  Select,
  Textarea,
  TagsInput,
  Stack,
  Group,
  Alert,
  Tabs
} from '@mantine/core'
import { logout, makeAuthenticatedRequest } from '../utils/auth'
import {
  COMPANY_SIZE_OPTIONS,
  EXPERIENCE_LEVELS,
  COMMON_INDUSTRIES,
  COMMON_HIRING_SECTORS,
  COMMON_DEPARTMENTS
} from '../utils/constants'
import classes from './RecruiterDashboard.module.css'

interface RecruiterProfile {
  id?: number
  userId?: number
  // Personal information
  firstName: string
  lastName: string
  phoneNumber: string
  
  // Company information
  company: string
  position: string
  department: string
  companySize: string
  industry: string
  
  // Contact information
  linkedinUrl: string
  companyUrl: string
  
  // Recruiting preferences
  hiringSectors: string[]
  experienceLevels: string[]
  
  // Additional information
  other: string[]
}

export default function RecruiterDashboard() {
  const [profile, setProfile] = useState<RecruiterProfile>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    company: '',
    position: '',
    department: '',
    companySize: '',
    industry: '',
    linkedinUrl: '',
    companyUrl: '',
    hiringSectors: [],
    experienceLevels: [],
    other: []
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080'

  // Load existing profile on component mount
  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    setLoading(true)
    try {
      const response = await makeAuthenticatedRequest(`${backendUrl}/api/profile/recruiter`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.profile) {
          setProfile({
            firstName: data.profile.firstName || '',
            lastName: data.profile.lastName || '',
            phoneNumber: data.profile.phoneNumber || '',
            company: data.profile.company || '',
            position: data.profile.position || '',
            department: data.profile.department || '',
            companySize: data.profile.companySize || '',
            industry: data.profile.industry || '',
            linkedinUrl: data.profile.linkedinUrl || '',
            companyUrl: data.profile.companyUrl || '',
            hiringSectors: data.profile.hiringSectors || [],
            experienceLevels: data.profile.experienceLevels || [],
            other: data.profile.other || [],
            id: data.profile.id,
            userId: data.profile.userId
          })
        }
      } else if (response.status === 404) {
        // Profile doesn't exist yet, that's okay
        console.log('No profile found, will create new one on save')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to load profile')
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const profileData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        company: profile.company,
        position: profile.position,
        department: profile.department,
        companySize: profile.companySize,
        industry: profile.industry,
        linkedinUrl: profile.linkedinUrl,
        companyUrl: profile.companyUrl,
        hiringSectors: profile.hiringSectors,
        experienceLevels: profile.experienceLevels,
        other: profile.other
      }

      const response = await makeAuthenticatedRequest(`${backendUrl}/api/profile/recruiter`, {
        method: 'PUT',
        body: JSON.stringify(profileData)
      })

      if (response.ok) {
        setSuccess('Profile saved successfully!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to save profile')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Save profile error:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container className={classes.dashboardContainer}>
        <div className={classes.loadingContainer}>
          <Text>Loading profile...</Text>
        </div>
      </Container>
    )
  }

  return (
    <Container className={classes.dashboardContainer}>
      <Title className={classes.dashboardTitle}>
        Recruiter Dashboard
      </Title>

      {/* Add navigation menu */}
      <Group justify="center" className={classes.navigationMenu} mb="xl">
        <Button
          component="a"
          href="/recruiter/dashboard"
          variant="subtle"
          size="md"
        >
          Profile Management
        </Button>
        <Button
          component="a"
          href="/recruiter/candidates"
          variant="filled"
          size="md"
          className={classes.navButton}
        >
          Search Candidates
        </Button>
      </Group>

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

      <Tabs defaultValue="personal" className={classes.tabsContainer}>
        <Tabs.List>
          <Tabs.Tab value="personal">Personal Info</Tabs.Tab>
          <Tabs.Tab value="company">Company Info</Tabs.Tab>
          <Tabs.Tab value="recruiting">Recruiting Preferences</Tabs.Tab>
          <Tabs.Tab value="additional">Additional Info</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="personal" className={classes.tabPanel}>
          <Card className={classes.sectionCard}>
            <Title order={3} className={classes.sectionTitle}>Personal Information</Title>
            <Stack className={classes.formStack}>
              <Group grow className={classes.formGroup}>
                <TextInput
                  label="First Name"
                  placeholder="Your first name"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Your last name"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />
              </Group>
              <TextInput
                label="Phone Number"
                placeholder="(555) 123-4567"
                value={profile.phoneNumber}
                onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
              />
              <TextInput
                label="LinkedIn URL"
                placeholder="https://linkedin.com/in/yourprofile"
                value={profile.linkedinUrl}
                onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
              />
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="company" className={classes.tabPanel}>
          <Card className={classes.sectionCard}>
            <Title order={3} className={classes.sectionTitle}>Company Information</Title>
            <Stack className={classes.formStack}>
              <Group grow className={classes.formGroup}>
                <TextInput
                  label="Company Name"
                  placeholder="Your company"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                />
                <TextInput
                  label="Your Position/Title"
                  placeholder="e.g., Senior Talent Acquisition Manager"
                  value={profile.position}
                  onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                />
              </Group>
              <Group grow className={classes.formGroup}>
                <TagsInput
                  label="Department"
                  placeholder="Select or type your department"
                  value={profile.department ? [profile.department] : []}
                  onChange={(value) => setProfile({ ...profile, department: value[0] || '' })}
                  data={COMMON_DEPARTMENTS}
                  maxTags={1}
                  clearable
                />
                <Select
                  label="Company Size"
                  placeholder="Select company size"
                  data={COMPANY_SIZE_OPTIONS}
                  value={profile.companySize}
                  onChange={(value) => setProfile({ ...profile, companySize: value || '' })}
                  clearable
                />
              </Group>
              <Group grow className={classes.formGroup}>
                <TagsInput
                  label="Industry"
                  placeholder="Select or type your industry"
                  value={profile.industry ? [profile.industry] : []}
                  onChange={(value) => setProfile({ ...profile, industry: value[0] || '' })}
                  data={COMMON_INDUSTRIES}
                  maxTags={1}
                  clearable
                />
                <TextInput
                  label="Company Website"
                  placeholder="https://yourcompany.com"
                  value={profile.companyUrl}
                  onChange={(e) => setProfile({ ...profile, companyUrl: e.target.value })}
                />
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="recruiting" className={classes.tabPanel}>
          <Card className={classes.sectionCard}>
            <Title order={3} className={classes.sectionTitle}>Recruiting Preferences</Title>
            <Stack className={classes.formStack}>
              <div>
                <TagsInput
                  label="Hiring Sectors"
                  placeholder="Type and press Enter to add sectors"
                  value={profile.hiringSectors}
                  onChange={(value) => setProfile({ ...profile, hiringSectors: value })}
                  data={COMMON_HIRING_SECTORS}
                  splitChars={[',', ' ', '|']}
                  maxTags={15}
                  clearable
                />
                <div className={classes.formDescription}>
                  Add the areas/sectors you typically recruit for (e.g., Software Engineering, Product Management).
                </div>
              </div>
              <div>
                <TagsInput
                  label="Experience Levels You Hire For"
                  placeholder="Select experience levels"
                  value={profile.experienceLevels}
                  onChange={(value) => setProfile({ ...profile, experienceLevels: value })}
                  data={EXPERIENCE_LEVELS.map(level => level.value)}
                  maxTags={4}
                  clearable
                />
                <div className={classes.formDescription}>
                  Select the experience levels you typically hire for.
                </div>
              </div>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="additional" className={classes.tabPanel}>
          <Card className={classes.sectionCard}>
            <Title order={3} className={classes.sectionTitle}>Additional Information</Title>
            <Stack className={classes.formStack}>
              <div>
                <Textarea
                  label="Additional Information"
                  placeholder="Any other information about your recruiting focus, company culture, or specific requirements (one item per line)"
                  value={profile.other.join('\n')}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    other: e.target.value.split('\n').filter(item => item.trim() !== '') 
                  })}
                  rows={6}
                />
                <div className={classes.formDescription}>
                  Add any additional information that might be relevant, such as specific technologies you recruit for, 
                  company culture details, remote work policies, or special programs.
                </div>
              </div>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>

      <div className={classes.buttonGroup}>
        <button
          onClick={saveProfile}
          disabled={saving}
          className={classes.saveButton}
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </Container>
  )
}