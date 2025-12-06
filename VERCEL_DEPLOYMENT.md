# Vercel Deployment Guide

## Overview

Fox Messenger is configured for seamless deployment on Vercel with automatic setup and fallback to Demo Mode when Firebase is not configured.

## Automatic Deployment Flow

### 1. Connect Repository
```bash
# Push to GitHub
git push origin main

# Vercel automatically detects changes
# Triggers new build and deployment
```

### 2. Environment Detection
The app automatically detects environment configuration:

```
Firebase Configured? 
├─ YES → Use Firebase Authentication
├─ NO → Fall back to Demo Mode
```

### 3. Demo Mode Fallback
If Firebase env vars are missing:
- App functions normally with demo account
- Users can login with any email/password
- Data persists in browser localStorage
- No backend dependency

## Pre-Deployment Checklist

### Local Testing
```bash
# Test demo mode (no Firebase)
npm run dev
# Visit http://localhost:3000/auth
# Test login/signup with demo account

# Test build
npm run build
npm start
```

### Firebase Setup (Optional)
If you want real authentication:

1. Create Firebase project
2. Get credentials
3. Add to environment variables

## Vercel Configuration

### 1. Connect Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up or login
- Import Git repository

### 2. Project Settings
```
Framework: Next.js
Build Command: npm run build
Start Command: next start
Root Directory: ./fox-messenger
```

### 3. Environment Variables (Optional)
Only add if using Firebase:

```
NEXT_PUBLIC_FIREBASE_API_KEY = your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID = your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID = your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL = your_rtdb_url
```

### 4. Deploy
```bash
# Push to main branch
git push origin main

# Vercel deploys automatically
# Check deployment status at https://vercel.com/dashboard
```

## Deployment Strategies

### Strategy 1: Demo Mode Only (Recommended for Quick Setup)
✅ **Advantages:**
- No backend configuration needed
- Deploys in minutes
- Works immediately
- Perfect for testing

❌ **Limitations:**
- No real data persistence
- Data lost on refresh
- Single user testing

**Steps:**
1. Push to GitHub
2. Connect to Vercel
3. Deploy (no env vars needed)
4. Done!

### Strategy 2: Firebase + Demo Mode (Production Ready)
✅ **Advantages:**
- Real authentication
- Data persistence
- Multiple users
- Production-ready

⚠️ **Setup Time:**
- ~10 minutes to set up Firebase
- ~5 minutes to add env vars

**Steps:**
1. Create Firebase project
2. Set environment variables in Vercel
3. Push to GitHub
4. Deploy
5. Data persists in Firebase

### Strategy 3: Staged Deployment

#### Development (Demo Mode)
```
Branch: develop
Environment: demo
Firebase: Disabled
```

#### Staging (Firebase)
```
Branch: staging
Environment: staging
Firebase: Enabled (test project)
```

#### Production (Firebase)
```
Branch: main
Environment: production
Firebase: Enabled (prod project)
```

## Deployment Troubleshooting

### Build Fails with Firebase Error
**Problem:** `Cannot parse Firebase url` during build

**Solution:**
- Ensure `export const dynamic = 'force-dynamic'` on all pages
- Or don't configure Firebase env vars (demo mode)

### App shows "Demo Mode" on Production
**Problem:** Firebase env vars not set on Vercel

**Solution:**
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add Firebase env vars
4. Redeploy

### Users can't login on Vercel
**Problem:** Demo mode configured but login fails

**Solution:**
1. Check browser console for errors
2. Try demo button first
3. Clear browser cache
4. Check .env.local matches Vercel env vars

## Performance Optimization

### Deployment Configuration
**vercel.json:**
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1",
      "methods": ["GET", "POST", "PUT", "DELETE"]
    }
  ]
}
```

### Image Optimization
- Vercel automatically optimizes images
- DiceBear avatars cached
- Next.js Image component used

### Edge Functions
API routes run on Vercel's Edge Functions when possible:
- Faster response times
- Lower latency
- Global distribution

## Monitoring

### Vercel Dashboard
- Real-time deployment status
- Error logs
- Performance metrics

### Analytics
- Enable Web Analytics in Vercel Dashboard
- View user activity
- Track performance

## CI/CD Pipeline

### Automatic Deployments
```yaml
Trigger: Push to main
├─ Install dependencies
├─ Run TypeScript checks
├─ Build project
├─ Run tests
└─ Deploy to Vercel
```

### Preview Deployments
```yaml
Trigger: Create PR
├─ Build preview
├─ Deploy to unique URL
├─ Enable testing
└─ Keep for 24 hours
```

## Rollback

### If Deployment Fails
```
1. Go to Vercel Dashboard
2. Select project
3. Go to "Deployments"
4. Select previous working deployment
5. Click "Promote to Production"
```

### Manual Rollback
```bash
# Revert commit
git revert <commit_hash>
git push origin main

# Vercel rebuilds with previous code
```

## Domain Setup

### Custom Domain
1. Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records
4. SSL certificate auto-configured

### Default Domain
- `<project-name>.vercel.app`
- Updated automatically on each deploy

## Scaling

### Auto-Scaling
- Vercel automatically scales based on traffic
- No configuration needed
- Pay-as-you-go pricing

### Database (Future)
When adding real database:
- MongoDB Atlas
- PostgreSQL on Vercel Postgres
- Firebase Firestore

## Security Best Practices

✓ **Enable:**
- HTTPS (automatic)
- Environment variable encryption
- Rate limiting on API routes
- CORS headers

✓ **Recommended:**
- Enable two-factor authentication on Vercel
- Use branch protection rules on GitHub
- Review deployment previews before merge

## Cost Estimation

### Free Tier (Vercel)
- Up to 3 serverless functions
- Unlimited bandwidth
- Automatic HTTPS
- **Perfect for demo mode**

### Pro Tier (Vercel)
- Unlimited serverless functions
- Custom domains
- Priority support
- **Recommended for production**

### Firebase (Pay-as-you-go)
- Free tier: 50K reads/day
- Auth: $0.00 (generous free tier)
- Firestore: $0.06 per 100K reads

## Deployment Status

Current configuration supports:
- ✅ Demo mode deployment (no Firebase)
- ✅ Firebase deployment (with env vars)
- ✅ Automatic fallback
- ✅ Preview deployments
- ✅ Custom domains

## Quick Deploy

### One-Click Deploy (Coming Soon)
```
Deploy button for quick Vercel setup
```

### Deploy from CLI
```bash
npm i -g vercel
vercel
```

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase Hosting](https://firebase.google.com/docs)
- Project Issues on GitHub

---

**Ready to deploy?** Start with demo mode, upgrade to Firebase when ready! 🚀
