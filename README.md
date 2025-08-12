# WIP-frontend
Frontend repository for "Apture" - The recruitment platform of the Future

## Overview
This is a React TypeScript application built with Vite for fast development builds. The project uses Mantine v7 for UI components and implements a modern, responsive design for a recruitment platform targeting early-career professionals.

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Mantine v7
- **Routing**: React Router v6
- **Styling**: CSS Modules + Global CSS with CSS Variables
- **Package Manager**: npm/yarn
- **Authentication**: JWT tokens with role-based access control

## Project Structure
```
src/
├── App.tsx                 # Main app component with routing
├── main.tsx               # Application entry point
├── index.css              # Global styles and CSS variables
├── global.d.ts            # TypeScript declarations
├── vite-env.d.ts          # Vite environment variable types
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation header with auth menus
│   ├── Header.module.css  # Header component styles
│   ├── Footer.tsx         # Application footer
│   ├── Footer.module.css  # Footer component styles
│   ├── Layout.tsx         # Main layout wrapper using AppShell
│   ├── ProtectedRoute.tsx # Route protection component
│   └── page.css           # Shared page styling
├── pages/                 # Route components
│   ├── Home.tsx           # Landing page
│   ├── About.tsx          # About page
│   ├── Blog.tsx           # Blog page
│   ├── ApplicantLogin.tsx # Applicant authentication
│   ├── ApplicantSignup.tsx# Applicant registration
│   ├── ApplicantDashboard.tsx # Protected applicant dashboard
│   ├── RecruiterLogin.tsx # Recruiter authentication
│   ├── RecruiterSignup.tsx# Recruiter registration
│   ├── RecruiterDashboard.tsx # Protected recruiter dashboard
│   └── Login.module.css   # Shared authentication styles
└── utils/                 # Utility functions
    └── auth.ts            # Authentication utilities
```

## Authentication System

### User Roles
The application supports two user types that align with the backend Prisma schema:
- **Applicant**: Job seekers and candidates
- **Recruiter**: Hiring managers and talent acquisition professionals

### Authentication Flow
1. **Registration**: Separate signup flows for applicants and recruiters
2. **Login**: Role-specific login pages with validation
3. **Protected Routes**: Dashboard access restricted by user type
4. **Session Management**: JWT token storage with automatic logout

### Key Authentication Features
- **Role Validation**: Users can only access their designated login pages
- **Token Management**: Separate token storage for different user types
- **Route Protection**: Dashboard routes require authentication and proper role
- **Dynamic Header**: Menu options change based on authentication status
- **Cross-role Prevention**: Applicants cannot access recruiter features and vice versa

## Backend Integration

### Environment Configuration
```env
VITE_BACKEND_BASE_URL=https://your-backend-url.com
```

### API Endpoints Used
- `POST /api/auth/signup` - User registration with role specification
- `POST /api/auth/login` - User authentication returning JWT token

### Authentication Utilities (`utils/auth.ts`)
```typescript
// Token management
getAuthToken() // Retrieves current user's token
getUserType() // Returns 'applicant' or 'recruiter'
isAuthenticated() // Checks if user is logged in
logout() // Clears tokens and redirects to home

// API integration
makeAuthenticatedRequest() // Makes API calls with auth headers
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
- **Authenticated**: User menu with dashboard link and logout option
- Dynamic button text based on user type
- Role-appropriate dashboard navigation

### ProtectedRoute Component (`ProtectedRoute.tsx`)
Wrapper component that restricts access to authenticated users.

**Features:**
- Redirects unauthenticated users to home page
- Validates user type against required permissions
- Handles cross-role access attempts
- Seamless integration with React Router

### Authentication Pages
Consistent styling across all auth pages using shared CSS module.

**ApplicantLogin/ApplicantSignup:**
- Form validation and error handling
- Role verification against backend
- Automatic redirect to applicant dashboard
- Cross-linking to recruiter authentication

**RecruiterLogin/RecruiterSignup:**
- Same features as applicant auth with role-specific validation
- Automatic redirect to recruiter dashboard
- Error handling for wrong account type

### Dashboard Pages
Protected pages that serve as landing areas for authenticated users.

**Features:**
- Role-specific welcome content
- Logout functionality
- Placeholder content for future feature development
- Consistent styling with other pages

## Styling Guidelines

### CSS Architecture
- **Global Styles**: `index.css` for variables and base styles
- **Component Styles**: CSS Modules for component-specific styling
- **Authentication Styles**: Shared `Login.module.css` for all auth pages
- **Inline Styles**: For dynamic or one-off styling needs

## Development Guidelines

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
  method: 'GET'
})
```

### Adding New User Types
1. Update `ProtectedRoute` interface
2. Modify auth utilities in `utils/auth.ts`
3. Add new login/signup pages
4. Update header menu logic

## Security Considerations
- Role validation on both frontend and backend
- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- Route protection prevents unauthorized access
- Cross-role access prevention
- Automatic logout on authentication failure

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
VITE_BACKEND_BASE_URL=https://your-backend-url.com
```

## Next Steps
- Implement email verification for new user accounts
- Add password reset functionality
- Create profile management pages for applicants and recruiters
- Develop job posting and application features
- Implement search and filtering capabilities
- Add real-time notifications
- Enhance mobile responsiveness
- Implement proper error boundaries and loading states

## Development History

8/8/2025

Work so far:
- Significant overhaul to frontend design, adding logo, better navbar tools, and routing behavior.
- Added functionality for the "Log In" button with a placeholder alert for future login behavior.
- Increased spacing between "Features," "Blog," and "Contact" links in the Header for improved layout.
- Applied consistent text styling across the Home and About pages, including placeholder text for the About page.

Issues:
- Need to implement actual login functionality, including modal or page redirection.
- Placeholder text on the About page needs to be replaced with real content.
- Styling refinements are still needed for responsiveness and overall polish.

8/1/2025

Work so far:
- Established project skeleton with React (TypeScript) and Vite for fast development builds.
- Integrated Mantine v7 for UI components and theming.
- Implemented base routing structure using React Router.
- Created initial layout components:
    - Header (navigation bar and top bar)
    - Footer
    - Layout for consistent page padding and structure.
- Set up initial pages (Home, About, Blog, RecruiterLogin, StudentLogin) for navigation flow testing.

Issues:
- Styling needs a lot of work. I have an idea on how I want it to look, but execution will take some time.
- Also need to begin adding student/recruiter login pages and api integration for content fetching.