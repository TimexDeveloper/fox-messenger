# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Clone & Install
```bash
cd fox-messenger
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Create Account (Demo Mode)
- Click "Sign Up" or "🚀 Пробный вход"
- Enter any email and password
- Access the app!

## ✨ What You Get

### Authentication
- ✅ Demo mode (works instantly, no setup)
- ✅ Firebase mode (optional, with real accounts)
- ✅ Automatic mode detection
- ✅ Session persistence

### Features
- 💬 Messaging interface (UI ready)
- 📞 Video/audio calls (WebRTC prepared)
- 👥 Friends list & management
- ⚙️ Settings & preferences
- 🛠️ Developer mode with debug tools

## 🎯 Demo Mode (Default)

Works instantly with zero backend setup:

```bash
npm run dev
```

Login with any email/password:
```
Email: test@example.com
Password: anything
```

✅ That's it! App works completely.

⚠️ **Note:** Data persists in browser localStorage only. Clear cache = lose data.

## 🔥 Firebase Mode (Optional)

For real multi-user experience:

### 1. Create Firebase Project
```bash
# Option A: Use setup script (Linux/Mac)
bash setup-firebase.sh

# Option B: Manual setup
# Go to https://console.firebase.google.com
# Create new project
# Enable Authentication > Email/Password
# Create Firestore Database
```

### 2. Get Credentials
- Project Settings → Your apps → Copy Firebase config

### 3. Set Environment Variables
```bash
# Create .env.local
cp .env.example .env.local

# Edit .env.local and add your Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
# ... etc
```

### 4. Restart Dev Server
```bash
npm run dev
```

### 5. Test
- Create account (data saved to Firebase)
- Login (retrieves from Firebase)
- Data persists across sessions

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm start
```

### Deploy to Vercel

#### Option A: Demo Mode (Instant)
```bash
git push origin main
# Vercel auto-deploys
# App works immediately with demo mode
```

#### Option B: With Firebase
```bash
# 1. Add Firebase env vars to Vercel project settings
# 2. git push origin main
# 3. Vercel auto-deploys with Firebase
```

## 🧪 Testing

### Test Demo Mode
```bash
npm run dev
# Sign up with any email/password
# Should work immediately
```

### Test Firebase
```bash
# Set env vars (step 3 above)
npm run dev
# Sign up with real Firebase
# Data persists to Firestore
```

### Test Build
```bash
npm run build
npm start
# Open http://localhost:3000
```

## 📖 Full Documentation

- **[AUTHENTICATION.md](./AUTHENTICATION.md)** - Auth system details
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Deployment guide
- **[README.md](./README.md)** - Project overview
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was implemented

## 🛠️ Common Commands

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # Build for production
npm start            # Start production server

# Type checking
npm run lint         # Run TypeScript & ESLint

# Cleanup
npm run clean        # Remove node_modules & .next
npm install          # Reinstall dependencies
```

## ⚡ Features & Status

| Feature | Status | Mode |
|---------|--------|------|
| Sign Up | ✅ Working | Demo & Firebase |
| Login | ✅ Working | Demo & Firebase |
| Session Persistence | ✅ Working | Demo & Firebase |
| Messaging UI | ✅ Complete | Both |
| Video Calls UI | ✅ Complete | Both |
| Friends List | ✅ Complete | Both |
| Settings | ✅ Complete | Both |
| Developer Mode | ✅ Complete | Both |

## 🎨 Customize

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'fox-orange': '#FF6700',  // Change orange
  'fox-black': '#000000',   // Change black
}
```

### Change App Name
Search & replace "Fox Messenger" with your name

### Change Logo
Replace 🦊 emoji with your logo

## 🚨 Troubleshooting

### "Firebase not configured" message
- This is normal! Demo mode is active
- To use Firebase, add env vars to .env.local
- App works fine in demo mode

### Build fails
```bash
npm run clean
npm install
npm run build
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
# or kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill
```

### Clear browser data
```javascript
// Paste in browser console
localStorage.clear()
location.reload()
```

## 📝 Next Steps

1. ✅ Run the app (done!)
2. 🔐 Setup Firebase (optional)
3. 🚀 Deploy to Vercel
4. 🎉 Celebrate!

## 💡 Tips

- Use Demo Mode for quick testing
- Switch to Firebase for production
- Deploy early, deploy often
- Check Vercel dashboard for logs
- Use browser DevTools for debugging

## 🆘 Need Help?

- Check documentation files (see above)
- Look at browser console for errors
- Check Vercel deployment logs
- Review `.env.example` for configuration

---

**Ready?** Start with `npm install && npm run dev` 🚀

Questions? See **[AUTHENTICATION.md](./AUTHENTICATION.md)** for detailed guides.
