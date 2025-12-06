# Authentication & User Management

## Overview

Fox Messenger includes a sophisticated authentication system that supports both **Firebase** (production) and **Demo Mode** (development/testing).

## Authentication Modes

### 1. Firebase Mode (Production)
When Firebase environment variables are properly configured, the app uses real Firebase Authentication:

- **Email/Password Authentication**: Create accounts and login
- **User Persistence**: Data stored in Firestore
- **Session Management**: Firebase auth tokens
- **Real User System**: Each user gets a unique ID and profile

**Required Environment Variables:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
```

### 2. Demo Mode (Development)
When Firebase is not configured, the app automatically falls back to Demo Mode:

- **Demo Account**: Uses localStorage for persistence
- **Test Credentials**: Any email/password combination works
- **Demo User**: Creates a test user with generated avatar
- **No Backend Required**: Perfect for testing UI/UX

**To Activate Demo Mode:**
Simply leave Firebase env vars unconfigured or set them to placeholder values.

## Authentication Flow

### User Registration
```
1. User fills in email, password, and username
2. Sign up form submitted
3. System checks if Firebase is configured:
   - ✓ Firebase: Create user via Firebase Authentication + Firestore
   - ✓ Demo: Create mock user in localStorage
4. User redirected to /chats
5. User profile loaded into auth store
```

### User Login
```
1. User enters email and password
2. Login form submitted
3. System verifies credentials:
   - ✓ Firebase: Verify against Firebase
   - ✓ Demo: Accept any credentials
4. User object created with avatar and metadata
5. Persisted in localStorage and auth store
6. User redirected to /chats
```

### Session Persistence
```
1. User visits app
2. / (root page) checks for active session:
   - localStorage.getItem('fox_auth_user')
   - Firebase auth state
3. If user found: redirect to /chats
4. If no user: redirect to /auth
```

### Logout
```
1. User clicks logout button in Sidebar
2. useAuthStore.logout() called
3. localStorage cleared
4. User redirected to /auth
```

## Auth Store (Zustand)

**File:** `src/store/useAuthStore.ts`

```typescript
interface AuthUser {
  id: string;
  email: string;
  username: string;
  avatar: string;
  isOnline: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: AuthUser | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  logout: () => void;
}
```

**Usage in Components:**
```typescript
import { useAuthStore } from '@/store/useAuthStore';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthStore();
  
  return (
    <div>
      {isAuthenticated && <p>Welcome, {user?.username}!</p>}
    </div>
  );
}
```

## Auth Pages

### `/auth` - Login & Registration
**File:** `src/app/auth/page.tsx`

Features:
- Email/password input fields
- Toggle between Sign In and Sign Up
- Demo login button ("🚀 Пробный вход")
- Error message display
- Automatic avatar generation (DiceBear)

### `/chats` - Protected Route
**File:** `src/app/chats/page.tsx`

- Protected with `useAuth()` hook
- Shows loading screen during auth check
- Redirects to `/auth` if not authenticated
- Initializes user in app state

## API Routes for Auth

### POST `/api/auth/login`
**File:** `src/app/api/auth/login/route.ts`

Handles user login (demo mode for now):
```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "id": "user-abc123",
  "email": "user@example.com",
  "username": "username",
  "avatar": "https://api.dicebear.com/...",
  "isOnline": true
}
```

### POST `/api/auth/signup`
**File:** `src/app/api/auth/signup/route.ts`

Handles user registration:
```json
// Request
{
  "email": "newuser@example.com",
  "password": "password123",
  "username": "newuser"
}

// Response
{
  "id": "user-xyz789",
  "email": "newuser@example.com",
  "username": "newuser",
  "avatar": "https://api.dicebear.com/...",
  "isOnline": true
}
```

## Firebase Setup Guide

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com)
- Click "Create Project"
- Enable Google Cloud features

### 2. Enable Authentication
- Select "Authentication"
- Click "Get Started"
- Enable "Email/Password" provider

### 3. Create Firestore Database
- Select "Firestore Database"
- Create database in production mode
- Start with default security rules

### 4. Get Credentials
- Go to Project Settings
- Select "Your apps"
- Click Firebase SDK config
- Copy credentials

### 5. Set Environment Variables
In `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_rtdb_url
```

### 6. Deploy to Vercel
- Add same env vars to Vercel project settings
- Deploy and test

## Testing

### Demo Mode Testing
```bash
npm run dev
# Visit http://localhost:3000
# Click "Sign Up"
# Enter any email and password
# Click "Create Account"
# Should redirect to /chats
```

### Firebase Testing
```bash
# Set Firebase env vars in .env.local
npm run dev
# Visit http://localhost:3000
# Create real account
# Data synced to Firebase
```

## Security Notes

- ⚠️ **Demo mode is for development only** - No real authentication
- ✓ Firebase uses industry-standard security
- ✓ Passwords never stored in localStorage
- ✓ Session tokens managed by Firebase
- ✓ Environment variables not exposed to client (NEXT_PUBLIC_ prefix only for public keys)

## Troubleshooting

### "Firebase not configured" message appears
- Check `.env.local` has Firebase variables
- Verify API key is valid
- Ensure auth domain matches project

### Demo mode not working
- Clear localStorage: `localStorage.clear()`
- Refresh page
- Try again

### Cannot login with Firebase
- Check Firebase Console for user creation
- Verify credentials are correct
- Check browser console for errors

## Future Enhancements

- [ ] OAuth (Google, GitHub) integration
- [ ] Two-factor authentication (2FA)
- [ ] Email verification
- [ ] Password reset flow
- [ ] Social login providers
- [ ] User profile editing
- [ ] Avatar upload
