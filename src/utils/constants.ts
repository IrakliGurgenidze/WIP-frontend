// Shared constants for candidate and recruiter attributes

export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' }
] as const

export const AVAILABILITY_OPTIONS = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'internship', label: 'Internship' },
  { value: 'contract', label: 'Contract' }
] as const

export const COMPANY_SIZE_OPTIONS = [
  { value: 'startup', label: 'Startup (1-10 employees)' },
  { value: 'small', label: 'Small (11-50 employees)' },
  { value: 'medium', label: 'Medium (51-200 employees)' },
  { value: 'large', label: 'Large (201-1000 employees)' },
  { value: 'enterprise', label: 'Enterprise (1000+ employees)' }
] as const

// Academic and Professional Fields
export const COMMON_MAJORS = [
  'Computer Science',
  'Software Engineering', 
  'Information Technology',
  'Data Science',
  'Computer Engineering',
  'Information Systems',
  'Cybersecurity',
  'Mathematics',
  'Statistics',
  'Physics',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Marketing',
  'Finance',
  'Economics'
] as const

export const COMMON_INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Media & Entertainment',
  'Real Estate',
  'Automotive',
  'Energy',
  'Telecommunications',
  'Hospitality',
  'Government',
  'Non-Profit',
  'Other'
] as const

export const COMMON_DEPARTMENTS = [
  'Engineering',
  'Product',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'Human Resources',
  'Customer Success',
  'Design',
  'Data',
  'Security',
  'Legal',
  'Executive',
  'Business Development',
  'Strategy',
  'Research'
] as const

// Skills and Technical Areas
export const COMMON_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'C++',
  'C#',
  'SQL',
  'Git',
  'Docker',
  'AWS',
  'Azure',
  'Google Cloud',
  'HTML/CSS',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'GraphQL',
  'REST APIs',
  'Agile',
  'Scrum',
  'Project Management',
  'Leadership',
  'Angular',
  'Vue.js',
  'Django',
  'Flask',
  'Spring Boot',
  'Kubernetes',
  'Terraform',
  'Jenkins',
  'Machine Learning',
  'Data Analysis',
  'TensorFlow',
  'PyTorch'
] as const

// Hiring and Interest Areas
export const COMMON_HIRING_SECTORS = [
  'Software Engineering',
  'Data Science',
  'Product Management',
  'Design (UI/UX)',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'Human Resources',
  'Customer Success',
  'DevOps/Infrastructure',
  'Security',
  'Research & Development',
  'Quality Assurance',
  'Business Development',
  'Strategy',
  'Analytics',
  'Content Creation'
] as const

export const COMMON_INTERESTS = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'Cybersecurity',
  'Cloud Computing',
  'DevOps',
  'UI/UX Design',
  'Product Management',
  'Artificial Intelligence',
  'Blockchain',
  'Game Development',
  'IoT',
  'Fintech',
  'E-commerce',
  'Healthcare Tech',
  'EdTech',
  'Social Impact',
  'Startup Environment',
  'Enterprise Solutions'
] as const

// Geographic Locations
export const COMMON_LOCATIONS = [
  'New York, NY',
  'San Francisco, CA',
  'Seattle, WA',
  'Austin, TX',
  'Boston, MA',
  'Chicago, IL',
  'Los Angeles, CA',
  'Denver, CO',
  'Atlanta, GA',
  'Washington, DC',
  'Portland, OR',
  'Miami, FL',
  'Dallas, TX',
  'Phoenix, AZ',
  'Remote',
  'Hybrid'
] as const

// Type exports for better TypeScript support
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number]['value']
export type AvailabilityOption = typeof AVAILABILITY_OPTIONS[number]['value']
export type CompanySize = typeof COMPANY_SIZE_OPTIONS[number]['value']
export type Major = typeof COMMON_MAJORS[number]
export type Industry = typeof COMMON_INDUSTRIES[number]
export type Department = typeof COMMON_DEPARTMENTS[number]
export type Skill = typeof COMMON_SKILLS[number]
export type HiringSector = typeof COMMON_HIRING_SECTORS[number]
export type Interest = typeof COMMON_INTERESTS[number]
export type Location = typeof COMMON_LOCATIONS[number]