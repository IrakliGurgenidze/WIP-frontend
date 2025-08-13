import React, { useState, useEffect } from 'react'
import { 
  Title, 
  Text, 
  Container, 
  Button, 
  Card, 
  TextInput, 
  NumberInput,
  Select,
  Textarea,
  TagsInput,
  Stack,
  Group,
  Divider,
  Alert,
  Tabs
} from '@mantine/core'
import { logout, makeAuthenticatedRequest } from '../utils/auth'
import { 
  EXPERIENCE_LEVELS,
  AVAILABILITY_OPTIONS,
  COMMON_SKILLS,
  COMMON_INTERESTS,
  COMMON_LOCATIONS
} from '../utils/constants'
import classes from './ApplicantDashboard.module.css'

interface WorkExperience {
  id?: number
  companyName: string
  location: string
  startDate: string
  endDate: string | null
  roleDescription: string
}

interface ApplicantProfile {
  id?: number
  userId?: number
  // Personal information
  firstName: string
  lastName: string
  phoneNumber: string
  
  // Academic information
  university: string
  major: string
  graduationYear: number | null
  gpa: number | null
  
  // Professional information
  portfolioUrl: string
  linkedinUrl: string
  githubUrl: string
  
  // Skills and preferences
  skills: string[]
  interests: string[]
  experienceLevel: string
  
  // Job search preferences
  preferredLocations: string[]
  salaryExpectation: number | null
  availability: string
  
  // Additional information
  other: string[]
  
  // Work experience (handled separately)
  workExperience?: WorkExperience[]
}

export default function ApplicantDashboard() {
  const [profile, setProfile] = useState<ApplicantProfile>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    university: '',
    major: '',
    graduationYear: null,
    gpa: null,
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    skills: [],
    interests: [],
    experienceLevel: '',
    preferredLocations: [],
    salaryExpectation: null,
    availability: '',
    other: []
  })

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([])
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
      const response = await makeAuthenticatedRequest(`${backendUrl}/api/profile/applicant`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.profile) {
          // Set profile data (excluding work experience)
          const { workExperience: work, ...profileData } = data.profile
          setProfile({
            firstName: profileData.firstName || '',
            lastName: profileData.lastName || '',
            phoneNumber: profileData.phoneNumber || '',
            university: profileData.university || '',
            major: profileData.major || '',
            graduationYear: profileData.graduationYear || null,
            gpa: profileData.gpa || null,
            portfolioUrl: profileData.portfolioUrl || '',
            linkedinUrl: profileData.linkedinUrl || '',
            githubUrl: profileData.githubUrl || '',
            skills: profileData.skills || [],
            interests: profileData.interests || [],
            experienceLevel: profileData.experienceLevel || '',
            preferredLocations: profileData.preferredLocations || [],
            salaryExpectation: profileData.salaryExpectation || null,
            availability: profileData.availability || '',
            other: profileData.other || [],
            id: profileData.id,
            userId: profileData.userId
          })
          
          // Set work experience separately
          setWorkExperience(work || [])
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
      // Save profile data (excluding work experience)
      const profileData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        university: profile.university,
        major: profile.major,
        graduationYear: profile.graduationYear,
        gpa: profile.gpa,
        portfolioUrl: profile.portfolioUrl,
        linkedinUrl: profile.linkedinUrl,
        githubUrl: profile.githubUrl,
        skills: profile.skills,
        interests: profile.interests,
        experienceLevel: profile.experienceLevel,
        preferredLocations: profile.preferredLocations,
        salaryExpectation: profile.salaryExpectation,
        availability: profile.availability,
        other: profile.other
      }

      const response = await makeAuthenticatedRequest(`${backendUrl}/api/profile/applicant`, {
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

  const addWorkExperience = () => {
    // Add work experience locally first - don't call backend until user fills it out
    const newExperience: WorkExperience = {
      // No ID - indicates this is not yet saved to backend
      companyName: '',
      location: '',
      startDate: '',
      endDate: null,
      roleDescription: ''
    }
    
    setWorkExperience([...workExperience, newExperience])
    setSuccess('New work experience added! Fill in the details and they will be saved automatically.')
    setTimeout(() => setSuccess(''), 3000)
  }

  // Update the updateWorkExperience function to handle saving new entries
  const updateWorkExperience = async (index: number, field: keyof WorkExperience, value: any) => {
    const updated = [...workExperience]
    updated[index] = { ...updated[index], [field]: value }
    setWorkExperience(updated)

    const experience = updated[index]
    
    // If experience has an ID, update it
    if (experience.id) {
      try {
        const experienceData = {
          companyName: experience.companyName,
          location: experience.location,
          startDate: experience.startDate,
          endDate: experience.endDate,
          roleDescription: experience.roleDescription
        }

        const response = await makeAuthenticatedRequest(
          `${backendUrl}/api/profile/applicant/work-experience/${experience.id}`,
          {
            method: 'PUT',
            body: JSON.stringify(experienceData)
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          setError(errorData.message || 'Failed to update work experience')
        }
      } catch (err) {
        console.error('Update work experience error:', err)
      }
    } 
    // If no ID and all required fields are filled, create new entry
    else if (experience.companyName && experience.location && experience.startDate && experience.roleDescription) {
      try {
        const experienceData = {
          companyName: experience.companyName,
          location: experience.location,
          startDate: experience.startDate,
          endDate: experience.endDate,
          roleDescription: experience.roleDescription
        }

        const response = await makeAuthenticatedRequest(
          `${backendUrl}/api/profile/applicant/work-experience`,
          {
            method: 'POST',
            body: JSON.stringify(experienceData)
          }
        )

        if (response.ok) {
          const data = await response.json()
          // Update the local state with the ID from backend
          const updatedWithId = [...workExperience]
          updatedWithId[index] = { ...updatedWithId[index], id: data.workExperience.id }
          setWorkExperience(updatedWithId)
          
          setSuccess('Work experience saved successfully!')
          setTimeout(() => setSuccess(''), 3000)
        } else {
          const errorData = await response.json()
          setError(errorData.message || 'Failed to save work experience')
        }
      } catch (err) {
        setError('Network error. Please try again.')
        console.error('Create work experience error:', err)
      }
    }
  }

  const removeWorkExperience = async (index: number) => {
    const experience = workExperience[index]
    
    if (experience.id) {
      try {
        const response = await makeAuthenticatedRequest(
          `${backendUrl}/api/profile/applicant/work-experience/${experience.id}`,
          { method: 'DELETE' }
        )

        if (response.ok) {
          const updated = workExperience.filter((_, i) => i !== index)
          setWorkExperience(updated)
          setSuccess('Work experience removed successfully!')
          setTimeout(() => setSuccess(''), 3000)
        } else {
          const errorData = await response.json()
          setError(errorData.message || 'Failed to remove work experience')
        }
      } catch (err) {
        setError('Network error. Please try again.')
        console.error('Remove work experience error:', err)
      }
    } else {
      // If no ID, just remove from local state
      const updated = workExperience.filter((_, i) => i !== index)
      setWorkExperience(updated)
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
        Applicant Dashboard
      </Title>

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
          <Tabs.Tab value="academic">Academic</Tabs.Tab>
          <Tabs.Tab value="professional">Professional</Tabs.Tab>
          <Tabs.Tab value="skills">Skills & Interests</Tabs.Tab>
          <Tabs.Tab value="preferences">Job Preferences</Tabs.Tab>
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
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="academic" className={classes.tabPanel}>
          <Card className={classes.sectionCard}>
            <Title order={3} className={classes.sectionTitle}>Academic Information</Title>
            <Stack className={classes.formStack}>
              <TextInput
                label="University"
                placeholder="Your university or college"
                value={profile.university}
                onChange={(e) => setProfile({ ...profile, university: e.target.value })}
              />
              <TextInput
                label="Major"
                placeholder="Your field of study"
                value={profile.major}
                onChange={(e) => setProfile({ ...profile, major: e.target.value })}
              />
              <Group grow className={classes.formGroup}>
                <NumberInput
                  label="Graduation Year"
                  placeholder="2024"
                  min={2000}
                  max={2030}
                  value={profile.graduationYear === null ? undefined : profile.graduationYear}
                  onChange={(value) => setProfile({ ...profile, graduationYear: value as number })}
                />
                <NumberInput
                  label="GPA"
                  placeholder="3.50"
                  min={0}
                  max={4}
                  step={0.01}
                  decimalScale={2}
                  value={profile.gpa === null ? undefined : profile.gpa}
                  onChange={(value) => setProfile({ ...profile, gpa: value as number })}
                />
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="professional" className={classes.tabPanel}>
          <Card className={classes.sectionCard}>
            <Title order={3} className={classes.sectionTitle}>Professional Information</Title>
            <Stack className={classes.formStack}>
              <Group grow className={classes.formGroup}>
                <TextInput
                  label="Portfolio URL"
                  placeholder="https://yourportfolio.com"
                  value={profile.portfolioUrl}
                  onChange={(e) => setProfile({ ...profile, portfolioUrl: e.target.value })}
                />
                <TextInput
                  label="LinkedIn URL"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={profile.linkedinUrl}
                  onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                />
              </Group>
              <TextInput
                label="GitHub URL"
                placeholder="https://github.com/yourusername"
                value={profile.githubUrl}
                onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
              />

              <Divider label="Work Experience" labelPosition="center" />
              
              {workExperience.map((exp, index) => (
                <div key={exp.id || `temp-${index}`} className={classes.workExperienceCard}>
                  <Stack className={classes.formStack}>
                    <div className={classes.experienceHeader}>
                      <Text className={classes.experienceTitle}>
                        Experience #{index + 1}
                        {exp.id ? (
                          <span style={{ fontSize: '0.8rem', color: '#28a745' }}> (Saved)</span>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: '#ffc107' }}> (Not saved - fill required fields)</span>
                        )}
                      </Text>
                      <button
                        className={classes.removeButton}
                        onClick={() => removeWorkExperience(index)}
                      >
                        Remove
                      </button>
                    </div>
                    <Group grow className={classes.formGroup}>
                      <TextInput
                        label="Company Name"
                        placeholder="Company Inc."
                        value={exp.companyName}
                        onChange={(e) => updateWorkExperience(index, 'companyName', e.target.value)}
                      />
                      <TextInput
                        label="Location"
                        placeholder="City, State"
                        value={exp.location}
                        onChange={(e) => updateWorkExperience(index, 'location', e.target.value)}
                      />
                    </Group>
                    <Group grow className={classes.formGroup}>
                      <TextInput
                        label="Start Date"
                        placeholder="2023-01-01"
                        type="date"
                        value={exp.startDate.split('T')[0]} // Handle ISO date format
                        onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                      />
                      <TextInput
                        label="End Date (leave empty if current)"
                        placeholder="2023-12-31"
                        type="date"
                        value={exp.endDate ? exp.endDate.split('T')[0] : ''}
                        onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value || null)}
                      />
                    </Group>
                    <Textarea
                      label="Role Description"
                      placeholder="Describe your responsibilities and achievements"
                      value={exp.roleDescription}
                      onChange={(e) => updateWorkExperience(index, 'roleDescription', e.target.value)}
                      rows={3}
                    />
                  </Stack>
                </div>
              ))}
              
              <button className={classes.addExperienceButton} onClick={addWorkExperience}>
                Add Work Experience
              </button>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="skills" className={classes.tabPanel}>
          <Card className={classes.sectionCard}>
            <Title order={3} className={classes.sectionTitle}>Skills & Interests</Title>
            <Stack className={classes.formStack}>
              <div>
                <TagsInput
                  label="Skills"
                  placeholder="Type and press Enter to add skills"
                  value={profile.skills}
                  onChange={(value) => setProfile({ ...profile, skills: value })}
                  data={COMMON_SKILLS}
                  splitChars={[',', ' ', '|']}
                  maxTags={25}
                  clearable
                />
                <div className={classes.formDescription}>
                  Start typing a skill and press Enter. You can also select from common suggestions.
                </div>
              </div>
              <div>
                <TagsInput
                  label="Areas of Interest"
                  placeholder="Type and press Enter to add interests"
                  value={profile.interests}
                  onChange={(value) => setProfile({ ...profile, interests: value })}
                  data={COMMON_INTERESTS}
                  splitChars={[',', ' ', '|']}
                  maxTags={20}
                  clearable
                />
                <div className={classes.formDescription}>
                  Add your professional interests and areas you'd like to work in.
                </div>
              </div>
              <Select
                label="Experience Level"
                placeholder="Select your experience level"
                data={EXPERIENCE_LEVELS}
                value={profile.experienceLevel}
                onChange={(value) => setProfile({ ...profile, experienceLevel: value || '' })}
                clearable
              />
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="preferences" className={classes.tabPanel}>
          <Card className={classes.sectionCard}>
            <Title order={3} className={classes.sectionTitle}>Job Search Preferences</Title>
            <Stack className={classes.formStack}>
              <div>
                <TagsInput
                  label="Preferred Locations"
                  placeholder="Type and press Enter to add locations"
                  value={profile.preferredLocations}
                  onChange={(value) => setProfile({ ...profile, preferredLocations: value })}
                  data={COMMON_LOCATIONS}
                  splitChars={[',', ' ', '|']}
                  maxTags={15}
                  clearable
                />
                <div className={classes.formDescription}>
                  Add your preferred work locations, including remote or hybrid options.
                </div>
              </div>
              <Group grow className={classes.formGroup}>
                <div>
                  <NumberInput
                    label="Salary Expectation (USD)"
                    placeholder="50000"
                    min={0}
                    step={1000}
                    value={profile.salaryExpectation === null ? undefined : profile.salaryExpectation}
                    onChange={(value) => setProfile({ ...profile, salaryExpectation: value as number })}
                  />
                  <div className={classes.formDescription}>Annual salary expectation</div>
                </div>
                <Select
                  label="Availability"
                  placeholder="Select availability"
                  data={AVAILABILITY_OPTIONS}
                  value={profile.availability}
                  onChange={(value) => setProfile({ ...profile, availability: value || '' })}
                  clearable
                />
              </Group>
              <div>
                <Textarea
                  label="Additional Information"
                  placeholder="Any other information you'd like to share (one item per line)"
                  value={profile.other.join('\n')}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    other: e.target.value.split('\n').filter(item => item.trim() !== '') 
                  })}
                  rows={4}
                />
                <div className={classes.formDescription}>
                  Add any additional information that might be relevant to recruiters.
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