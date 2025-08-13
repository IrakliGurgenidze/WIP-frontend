import React, { useState, useEffect } from 'react'
import { 
  Title, 
  Text, 
  Container, 
  Card, 
  TextInput, 
  NumberInput,
  Select,
  TagsInput,
  Stack,
  Group,
  Button,
  Alert,
  Badge,
  Anchor,
  Divider,
  Loader,
  Pagination,
  ActionIcon
} from '@mantine/core'
import { IconSearch, IconFilter, IconExternalLink, IconUser } from '@tabler/icons-react'
import { makeAuthenticatedRequest } from '../utils/auth'
import {
  EXPERIENCE_LEVELS,
  COMMON_MAJORS,
  COMMON_SKILLS,
  COMMON_LOCATIONS
} from '../utils/constants'
import classes from './CandidateSearch.module.css'

interface SearchFilters {
  graduationYear?: number
  major?: string
  university?: string
  skills?: string[]
  preferredLocations?: string[]
  experienceLevel?: string
  minGpa?: number
  maxGpa?: number
}

interface CandidateResult {
  id: number
  userId: number
  firstName: string
  lastName: string
  university: string
  major: string
  graduationYear: number
  gpa: number
  skills: string[]
  interests?: string[]  // Made optional since backend may not include this
  experienceLevel: string
  preferredLocations: string[]
  portfolioUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  workExperience: {
    id: number
    companyName: string
    location: string
    startDate: string
    endDate: string | null
    roleDescription: string
  }[]
  user: {
    email: string
    createdAt: string
  }
}

interface SearchResponse {
  applicants: CandidateResult[]  // Changed from 'candidates' to 'applicants'
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
  }
}

export default function CandidateSearch() {
  const [filters, setFilters] = useState<SearchFilters>({})
  const [results, setResults] = useState<CandidateResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080'

  const searchCandidates = async (page: number = 1) => {
    setLoading(true)
    setError('')
    
    try {
      const queryParams = new URLSearchParams()
      
      // Add filters to query params
      if (filters.graduationYear) queryParams.append('graduationYear', filters.graduationYear.toString())
      if (filters.major) queryParams.append('major', filters.major)
      if (filters.university) queryParams.append('university', filters.university)
      if (filters.experienceLevel) queryParams.append('experienceLevel', filters.experienceLevel)
      if (filters.minGpa) queryParams.append('minGpa', filters.minGpa.toString())
      if (filters.maxGpa) queryParams.append('maxGpa', filters.maxGpa.toString())
      if (filters.skills && filters.skills.length > 0) {
        filters.skills.forEach(skill => queryParams.append('skills', skill))
      }
      if (filters.preferredLocations && filters.preferredLocations.length > 0) {
        filters.preferredLocations.forEach(location => queryParams.append('preferredLocations', location))
      }
      
      queryParams.append('page', page.toString())
      queryParams.append('limit', '10')

      // Updated endpoint to match backend
      const response = await makeAuthenticatedRequest(
        `${backendUrl}/api/search/applicants?${queryParams.toString()}`
      )

      if (response.ok) {
        const data: SearchResponse = await response.json()
        // Updated to use backend response structure
        setResults(data.applicants)
        setTotalPages(data.pagination.totalPages)
        setTotalResults(data.pagination.totalCount)
        setCurrentPage(data.pagination.currentPage)
        setHasSearched(true)
        
        if (data.applicants.length === 0) {
          setSuccess('Search completed. No candidates found matching your criteria.')
        } else {
          setSuccess(`Found ${data.pagination.totalCount} candidates matching your criteria.`)
        }
        setTimeout(() => setSuccess(''), 5000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Search failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    searchCandidates(1)
  }

  const handlePageChange = (page: number) => {
    searchCandidates(page)
  }

  const clearFilters = () => {
    setFilters({})
    setResults([])
    setHasSearched(false)
    setCurrentPage(1)
    setTotalPages(0)
    setTotalResults(0)
  }

  return (
    <Container className={classes.searchContainer}>
      <Title className={classes.searchTitle}>
        Candidate Search
      </Title>

      <Text className={classes.searchSubtitle}>
        Search and filter through our database of talented candidates
      </Text>

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

      {/* Search Filters */}
      <Card className={classes.filtersCard}>
        <Group justify="space-between" className={classes.filtersHeader}>
          <Group>
            <IconFilter size={20} />
            <Text size="lg" fw={600}>Search Filters</Text>
          </Group>
          <Button variant="subtle" onClick={clearFilters} size="sm">
            Clear All
          </Button>
        </Group>

        <Stack className={classes.filtersStack}>
          {/* Academic Filters */}
          <Group grow className={classes.filterGroup}>
            <NumberInput
              label="Graduation Year"
              placeholder="2024"
              min={2020}
              max={2030}
              value={filters.graduationYear}
              onChange={(value) => setFilters({ ...filters, graduationYear: value as number })}
            />
            <TagsInput
              label="Major"
              placeholder="Select or type major"
              value={filters.major ? [filters.major] : []}
              onChange={(value) => setFilters({ ...filters, major: value[0] || '' })}
              data={COMMON_MAJORS}
              maxTags={1}
              clearable
            />
          </Group>

          <TextInput
            label="University"
            placeholder="University name"
            value={filters.university || ''}
            onChange={(e) => setFilters({ ...filters, university: e.target.value })}
          />

          {/* GPA Range */}
          <Group grow className={classes.filterGroup}>
            <NumberInput
              label="Min GPA"
              placeholder="3.0"
              min={0}
              max={4}
              step={0.1}
              decimalScale={1}
              value={filters.minGpa}
              onChange={(value) => setFilters({ ...filters, minGpa: value as number })}
            />
            <NumberInput
              label="Max GPA"
              placeholder="4.0"
              min={0}
              max={4}
              step={0.1}
              decimalScale={1}
              value={filters.maxGpa}
              onChange={(value) => setFilters({ ...filters, maxGpa: value as number })}
            />
          </Group>

          {/* Skills and Experience */}
          <TagsInput
            label="Required Skills"
            placeholder="Type and press Enter to add skills"
            value={filters.skills || []}
            onChange={(value) => setFilters({ ...filters, skills: value })}
            data={COMMON_SKILLS}
            splitChars={[',', ' ', '|']}
            maxTags={10}
            clearable
          />

          <Group grow className={classes.filterGroup}>
            <Select
              label="Experience Level"
              placeholder="Select experience level"
              data={EXPERIENCE_LEVELS}
              value={filters.experienceLevel}
              onChange={(value) => setFilters({ ...filters, experienceLevel: value || '' })}
              clearable
            />
            <TagsInput
              label="Preferred Locations"
              placeholder="Select locations"
              value={filters.preferredLocations || []}
              onChange={(value) => setFilters({ ...filters, preferredLocations: value })}
              data={COMMON_LOCATIONS}
              maxTags={5}
              clearable
            />
          </Group>
        </Stack>

        <Group justify="center" className={classes.searchButtonGroup}>
          <Button
            leftSection={<IconSearch size={16} />}
            onClick={handleSearch}
            loading={loading}
            className={classes.searchButton}
            size="lg"
          >
            Search Candidates
          </Button>
        </Group>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <div className={classes.resultsSection}>
          <Group justify="space-between" className={classes.resultsHeader}>
            <Text size="lg" fw={600}>
              Search Results ({totalResults} candidates)
            </Text>
            {totalPages > 1 && (
              <Pagination
                value={currentPage}
                onChange={handlePageChange}
                total={totalPages}
                size="sm"
              />
            )}
          </Group>

          {loading ? (
            <div className={classes.loadingContainer}>
              <Loader size="lg" />
              <Text>Searching candidates...</Text>
            </div>
          ) : results.length === 0 ? (
            <Card className={classes.noResultsCard}>
              <Text ta="center" c="dimmed" size="lg">
                No candidates found matching your search criteria.
                Try adjusting your filters and search again.
              </Text>
            </Card>
          ) : (
            <Stack className={classes.resultsStack}>
              {results.map((candidate) => (
                <Card key={candidate.id} className={classes.candidateCard}>
                  <Group justify="space-between" align="flex-start">
                    <div className={classes.candidateInfo}>
                      <Group className={classes.candidateHeader}>
                        <IconUser size={20} />
                        <Text size="lg" fw={600}>
                          {candidate.firstName} {candidate.lastName}
                        </Text>
                        {candidate.experienceLevel && (
                          <Badge variant="light" color="blue">
                            {candidate.experienceLevel}
                          </Badge>
                        )}
                      </Group>

                      <Text c="dimmed" size="sm" className={classes.candidateEducation}>
                        {candidate.major} • {candidate.university} • Class of {candidate.graduationYear}
                        {candidate.gpa && ` • GPA: ${candidate.gpa}`}
                      </Text>

                      {candidate.skills && candidate.skills.length > 0 && (
                        <Group className={classes.skillsGroup}>
                          <Text size="sm" fw={500}>Skills:</Text>
                          <Group gap="xs">
                            {candidate.skills.slice(0, 5).map((skill) => (
                              <Badge key={skill} variant="outline" size="sm">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 5 && (
                              <Badge variant="outline" size="sm" c="dimmed">
                                +{candidate.skills.length - 5} more
                              </Badge>
                            )}
                          </Group>
                        </Group>
                      )}

                      {candidate.preferredLocations && candidate.preferredLocations.length > 0 && (
                        <Group className={classes.locationsGroup}>
                          <Text size="sm" fw={500}>Locations:</Text>
                          <Text size="sm" c="dimmed">
                            {candidate.preferredLocations.join(', ')}
                          </Text>
                        </Group>
                      )}

                      {candidate.workExperience && candidate.workExperience.length > 0 && (
                        <div className={classes.experienceSection}>
                          <Text size="sm" fw={500}>Recent Experience:</Text>
                          <Text size="sm" c="dimmed">
                            {candidate.workExperience[0].roleDescription} at {candidate.workExperience[0].companyName}
                          </Text>
                        </div>
                      )}

                      {/* Add interests display if available */}
                      {candidate.interests && candidate.interests.length > 0 && (
                        <Group className={classes.interestsGroup}>
                          <Text size="sm" fw={500}>Interests:</Text>
                          <Group gap="xs">
                            {candidate.interests.slice(0, 3).map((interest) => (
                              <Badge key={interest} variant="light" size="sm" color="grape">
                                {interest}
                              </Badge>
                            ))}
                            {candidate.interests.length > 3 && (
                              <Badge variant="light" size="sm" c="dimmed" color="grape">
                                +{candidate.interests.length - 3} more
                              </Badge>
                            )}
                          </Group>
                        </Group>
                      )}
                    </div>

                    <Stack className={classes.candidateLinks}>
                      {candidate.portfolioUrl && (
                        <Anchor
                          href={candidate.portfolioUrl}
                          target="_blank"
                          size="sm"
                          className={classes.candidateLink}
                        >
                          <Group gap="xs">
                            <IconExternalLink size={14} />
                            Portfolio
                          </Group>
                        </Anchor>
                      )}
                      {candidate.linkedinUrl && (
                        <Anchor
                          href={candidate.linkedinUrl}
                          target="_blank"
                          size="sm"
                          className={classes.candidateLink}
                        >
                          <Group gap="xs">
                            <IconExternalLink size={14} />
                            LinkedIn
                          </Group>
                        </Anchor>
                      )}
                      {candidate.githubUrl && (
                        <Anchor
                          href={candidate.githubUrl}
                          target="_blank"
                          size="sm"
                          className={classes.candidateLink}
                        >
                          <Group gap="xs">
                            <IconExternalLink size={14} />
                            GitHub
                          </Group>
                        </Anchor>
                      )}
                    </Stack>
                  </Group>
                </Card>
              ))}
            </Stack>
          )}

          {totalPages > 1 && !loading && (
            <Group justify="center" className={classes.paginationBottom}>
              <Pagination
                value={currentPage}
                onChange={handlePageChange}
                total={totalPages}
              />
            </Group>
          )}
        </div>
      )}
    </Container>
  )
}