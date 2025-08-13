# WIP-frontend
Frontend repository for "Apture" - The recruitment platform of the Future

## Overview
This is a React TypeScript application built with Vite for fast development builds. The project uses Mantine v7 for UI components and implements a modern, responsive design for a recruitment platform targeting early-career professionals. The application features complete authentication, profile management, and real-time work experience tracking for applicants.

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Mantine v7
- **Routing**: React Router v6
- **Styling**: CSS Modules + Global CSS with CSS Variables
- **Package Manager**: npm/yarn
- **Authentication**: JWT tokens with role-based access control
- **State Management**: React Hooks (useState, useEffect)

## Project Structure
```
src/
├── App.tsx                     # Main app component with routing
├── main.tsx                   # Application entry point
├── index.css                  # Global styles and CSS variables
├── global.d.ts                # TypeScript declarations
├── vite-env.d.ts              # Vite environment variable types
├── components/                # Reusable UI components
│   ├── Header.tsx             # Navigation header with auth menus
│   ├── Header.module.css      # Header component styles
│   ├── Footer.tsx             # Application footer
│   ├── Footer.module.css      # Footer component styles
│   ├── Layout.tsx             # Main layout wrapper using AppShell
│   ├── ProtectedRoute.tsx     # Route protection component
│   └── page.css               # Shared page styling
├── pages/                     # Route components
│   ├── Home.tsx               # Landing page
│   ├── About.tsx              # About page
│   ├── Blog.tsx               # Blog page
│   ├── ApplicantLogin.tsx     # Applicant authentication
│   ├── ApplicantSignup.tsx    # Applicant registration
│   ├── ApplicantDashboard.tsx # Full-featured applicant profile management
│   ├── ApplicantDashboard.module.css # Dashboard-specific styles
│   ├── RecruiterLogin.tsx     # Recruiter authentication
│   ├── RecruiterSignup.tsx    # Recruiter registration
│   ├── RecruiterDashboard.tsx # Protected recruiter dashboard
│   └── Login.module.css       # Shared authentication styles
└── utils/                     # Utility functions
    └── auth.ts                # Authentication utilities and API helpers
```

## Authentication System

### User Roles
The application supports two user types that align with the backend Prisma schema:
- **Applicant**: Job seekers and candidates with comprehensive profile management
- **Recruiter**: Hiring managers and talent acquisition professionals

### Authentication Flow
1. **Registration**: Separate signup flows for applicants and recruiters
2. **Login**: Role-specific login pages with validation
3. **Protected Routes**: Dashboard access restricted by user type
4. **Session Management**: JWT token storage with automatic logout
5. **Profile Management**: Complete CRUD operations for applicant profiles

### Key Authentication Features
- **Role Validation**: Users can only access their designated login pages
- **Token Management**: Separate token storage for different user types
- **Route Protection**: Dashboard routes require authentication and proper role
- **Dynamic Header**: Menu options change based on authentication status with red logout text
- **Cross-role Prevention**: Applicants cannot access recruiter features and vice versa

## Applicant Profile Management

### Profile Data Structure
The ApplicantDashboard manages comprehensive user profiles including:

```typescript
interface ApplicantProfile {
  // Personal Information
  firstName: string
  lastName: string
  phoneNumber: string
  
  // Academic Information
  university: string
  major: string
  graduationYear: number | null
  gpa: number | null
  
  // Professional Information
  portfolioUrl: string
  linkedinUrl: string
  githubUrl: string
  
  // Skills and Preferences
  skills: string[]              // Using TagsInput for dynamic entry
  interests: string[]           // Professional interests
  experienceLevel: string       // Entry, Junior, Mid, Senior
  
  // Job Search Preferences
  preferredLocations: string[]  // Including Remote/Hybrid options
  salaryExpectation: number | null
  availability: string          // Full-time, Part-time, etc.
  
  // Additional Information
  other: string[]              // Miscellaneous information
}

interface WorkExperience {
  id?: number
  companyName: string
  location: string
  startDate: string
  endDate: string | null       // null for current positions
  roleDescription: string
}
```

### Dashboard Features

#### Multi-Tab Interface
- **Personal Info**: Name and contact information
- **Academic**: University, major, graduation year, GPA
- **Professional**: URLs, work experience management
- **Skills & Interests**: Dynamic tag-based entry system
- **Job Preferences**: Location, salary, availability preferences

#### Work Experience Management
- **Dynamic Addition**: Add unlimited work experience entries
- **Auto-Save**: Automatic backend synchronization when required fields are filled
- **Visual Status**: Clear indicators showing saved vs. unsaved entries
- **Individual CRUD**: Each experience can be updated/deleted independently
- **Date Handling**: Support for current positions (null end date)

#### Advanced UI Features
- **TagsInput Integration**: Allows custom entry plus common suggestions for:
  - Skills (JavaScript, Python, React, etc.)
  - Interests (Web Development, Machine Learning, etc.)
  - Locations (Cities, Remote, Hybrid options)
- **Form Validation**: Client-side validation with backend error handling
- **Loading States**: Visual feedback during API operations
- **Success/Error Messages**: Real-time user feedback
- **Responsive Design**: Mobile-friendly layout

## Backend Integration

### Environment Configuration
```env
VITE_BACKEND_BASE_URL=https://your-backend-url.com
```

### API Endpoints

#### Authentication Endpoints
- `POST /api/auth/signup` - User registration with role specification
- `POST /api/auth/login` - User authentication returning JWT token

#### Profile Management Endpoints
- `GET /api/profile/applicant` - Retrieve complete applicant profile with work experience
- `PUT /api/profile/applicant` - Update applicant profile (excluding work experience)

#### Work Experience Endpoints
- `POST /api/profile/applicant/work-experience` - Create new work experience entry
- `PUT /api/profile/applicant/work-experience/:id` - Update specific work experience
- `DELETE /api/profile/applicant/work-experience/:id` - Delete work experience entry

### API Integration Features
- **Authenticated Requests**: All profile operations require valid JWT tokens
- **Error Handling**: Comprehensive error response processing
- **Optimistic Updates**: UI updates immediately with background sync
- **Automatic Retry**: Network error handling with user feedback
- **Data Validation**: Both client-side and server-side validation

### Authentication Utilities (`utils/auth.ts`)
```typescript
// Token management
getAuthToken()                    // Retrieves current user's token
getUserType()                     // Returns 'applicant' or 'recruiter'
isAuthenticated()                 // Checks if user is logged in
logout()                         // Clears tokens and redirects to home

// API integration
makeAuthenticatedRequest(url, options) // Makes API calls with auth headers
```

## Design System

### Color Palette
The application uses CSS custom properties for consistent theming:
- `--color-accent`: #BD87D6 (Purple accent)
- `--color-bg-light`: #FFF9F8 (Light background)
- `--color-bg-dark`: #22223B (Dark background)
- `--color-neutral`: #4A4E69 (Neutral text)

### Typography
- **Font Family**: Inter (with fallbacks)
- **Title Styling**: 32pt, justified alignment
- **Body Text**: 16pt, 1.5 line height, justified alignment
- **Form Labels**: Consistent styling across all input components

### Component Styling Architecture
- **CSS Modules**: Component-specific styling with scoped classes
- **CSS Variables**: Consistent theming across components
- **Responsive Design**: Mobile-first approach with breakpoint handling
- **Form Styling**: Consistent input styling with Mantine integration

## Component Guide

### Layout Component (`Layout.tsx`)
The main layout wrapper that provides consistent structure across all pages.

**Features:**
- Uses Mantine's AppShell for layout management
- Fixed header and footer positioning (120px header, 30px footer)
- Responsive container with max-width of 1200px
- Consistent padding and spacing

### Header Component (`Header.tsx`)
Two-tier navigation system with authentication-aware menus.

**Structure:**
- **Top Bar**: Home/About links + Authentication menu
- **Main Bar**: Logo + Features/Blog/Contact links

**Authentication Features:**
- **Unauthenticated**: Login dropdown with applicant/recruiter options
- **Authenticated**: User menu with dashboard link and **red logout option**
- Dynamic button text based on user type
- Role-appropriate dashboard navigation

### ApplicantDashboard Component (`ApplicantDashboard.tsx`)
Comprehensive profile management system for job applicants.

**Architecture:**
- **State Management**: Separate state for profile data and work experience
- **API Integration**: Real-time synchronization with backend
- **Form Handling**: Dynamic form validation and submission
- **User Experience**: Intuitive tab-based interface with clear feedback

**Key Features:**
- **Profile Persistence**: Automatic loading and saving of user data
- **Work Experience CRUD**: Full create, read, update, delete operations
- **Tag-Based Input**: Advanced input system for skills, interests, and locations
- **Visual Feedback**: Loading states, success messages, and error handling
- **Mobile Responsive**: Optimized for all device sizes

### ProtectedRoute Component (`ProtectedRoute.tsx`)
Wrapper component that restricts access to authenticated users.

**Features:**
- Redirects unauthenticated users to home page
- Validates user type against required permissions
- Handles cross-role access attempts
- Seamless integration with React Router

## Advanced Features

### TagsInput Implementation
Custom tag-based input system allowing users to:
- **Type Custom Values**: Add any skill, interest, or location
- **Select from Suggestions**: Common options provided for quick selection
- **Multiple Entry Methods**: Supports comma, space, and pipe separation
- **Visual Tag Management**: Easy removal of individual tags
- **Maximum Limits**: Prevents excessive entries (skills: 25, interests: 20, locations: 15)

### Work Experience Management
Sophisticated system for managing professional experience:
- **Local-First Approach**: Add experiences immediately to UI
- **Smart Auto-Save**: Automatically saves when all required fields are filled
- **Status Indicators**: Visual feedback showing saved vs. unsaved state
- **Individual Operations**: Each experience managed independently
- **Date Flexibility**: Supports current positions and date ranges

### Real-Time Data Synchronization
- **Optimistic Updates**: UI updates immediately for better user experience
- **Background Sync**: API calls happen transparently
- **Conflict Resolution**: Handles concurrent editing scenarios
- **Error Recovery**: Graceful handling of network issues

## Development Guidelines

### Adding New Profile Fields
1. Update TypeScript interfaces in `ApplicantDashboard.tsx`
2. Add form inputs in appropriate tab panel
3. Include field in save/load operations
4. Update backend API to handle new fields

### Implementing New Dashboard Features
1. Create new tab panel in the Tabs component
2. Add corresponding CSS classes in `ApplicantDashboard.module.css`
3. Implement state management and API integration
4. Add proper form validation and error handling

### Adding Protected Pages
1. Create component in `src/pages/`
2. Wrap route with `ProtectedRoute` in `App.tsx`
3. Specify required user type if needed

Example:
```tsx
<Route 
  path="/new-protected-page" 
  element={
    <ProtectedRoute requiredUserType="applicant">
      <NewPage />
    </ProtectedRoute>
  } 
/>
```

### Authentication Integration
For API calls requiring authentication:
```tsx
import { makeAuthenticatedRequest } from '../utils/auth'

const response = await makeAuthenticatedRequest('/api/protected-endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
})
```

## Security Considerations
- **Role-Based Access Control**: Both frontend and backend validation
- **JWT Token Management**: Secure token storage and automatic cleanup
- **Route Protection**: Prevents unauthorized access to sensitive pages
- **Cross-Role Prevention**: Users cannot access other role's features
- **API Security**: All profile operations require authentication
- **Input Validation**: Both client-side and server-side validation
- **Error Handling**: Secure error messages without exposing system details

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Setup

Create a `.env` file in the project root:
```env
VITE_BACKEND_BASE_URL=http://localhost:8080
# or your production backend URL
```

## Current Status

### Completed Features 
- **Complete Authentication System**: Registration, login, logout for both user types
- **Protected Routing**: Role-based access control with route protection
- **Comprehensive Applicant Dashboard**: Full profile management with real-time sync
- **Work Experience Management**: CRUD operations with auto-save functionality
- **Advanced Form Inputs**: TagsInput integration for dynamic data entry
- **Responsive Design**: Mobile-friendly layouts across all components
- **API Integration**: Complete backend synchronization with error handling
- **User Experience**: Loading states, success/error feedback, intuitive navigation

### In Progress 
- **Recruiter Dashboard**: Enhanced functionality for hiring managers
- **Job Posting System**: Allow recruiters to create and manage job listings
- **Application System**: Enable applicants to apply to jobs

## Next Steps
- **Email Verification**: Implement account verification for new users
- **Password Reset**: Add secure password recovery functionality
- **Enhanced Recruiter Features**: Complete recruiter dashboard with job management
- **Search and Filtering**: Advanced candidate and job search capabilities
- **Real-Time Notifications**: Live updates for applications and messages
- **File Upload**: Resume and portfolio document management
- **Analytics Dashboard**: Insights for recruiters on candidate engagement
- **Mobile App**: Native mobile application development
- **Advanced Matching**: AI-powered candidate-job matching algorithms

## Development History

### 8/13/2025 - Major Profile Management Implementation

**Work Completed:**
- Full ApplicantDashboard Implementation: Complete overhaul with comprehensive profile management
- Backend API Integration: Full CRUD operations for profiles and work experience
- Advanced UI Components: TagsInput integration for skills, interests, and locations
- Work Experience Management: Real-time CRUD operations with auto-save functionality
- Enhanced UX: Loading states, success/error messaging, and visual feedback
- Responsive Design: Mobile-optimized layouts with CSS Modules
- Authentication Enhancements: Improved header with red logout text, removed redundant buttons

**User Experience Improvements:**
- Intuitive tab-based profile organization
- Smart auto-save functionality for work experience
- Visual indicators for saved vs. unsaved data
- Dynamic tag-based input system for flexible data entry
- Comprehensive form validation with helpful error messages

### 8/8/2025 - Design and Navigation Overhaul

**Work completed:**
- Significant frontend design improvements with logo and enhanced navigation
- Improved Header component with better spacing and visual hierarchy
- Added functional authentication menus with role-based access
- Consistent text styling across Home and About pages
- Enhanced routing behavior and user experience

**Issues resolved:**
- Implemented actual login functionality replacing placeholder alerts
- Added proper navigation flow between different user types
- Improved responsive design and visual polish

### 8/1/2025 - Project Foundation

**Work completed:**
- Established React TypeScript project with Vite build system
- Integrated Mantine v7 for comprehensive UI component library
- Implemented React Router for client-side navigation
- Created foundational layout components (Header, Footer, Layout)
- Set up initial page structure and routing framework
- Established CSS architecture with modules and global variables

**Foundation established:**
- Modern development environment with fast builds
- Scalable component architecture
- Consistent styling system with CSS variables
- Professional navigation and layout structure