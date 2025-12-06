# Fox Messenger 🦊

A modern, functional, and stylish Single Page Application (SPA) messenger built with Next.js, TypeScript, and WebRTC.

**🚀 [Quick Start Guide →](./QUICKSTART.md)**

## ✨ What's New

- ✅ **Real Authentication** - Email/password signup & login
- ✅ **Demo Mode** - Works instantly without setup
- ✅ **Firebase Ready** - Add credentials for real database
- ✅ **Zero Config Deployment** - Deploy to Vercel immediately
- ✅ **Automatic Mode Detection** - Firebase or Demo mode automatically
- ✅ **User Persistence** - Sessions persist across page reloads

## 🎯 Getting Started

### Fastest Way (Demo Mode)
```bash
npm install
npm run dev
# Visit http://localhost:3000
# Sign up with any email/password
# Done! 🎉
```

### With Firebase (Production)
```bash
# 1. Set Firebase env vars in .env.local
# 2. npm run dev
# 3. Create real account
# 4. Data synced to Firebase
```

See **[QUICKSTART.md](./QUICKSTART.md)** for detailed setup.

## Features

### 🔐 Authentication & User Management
- **Email/Password Authentication** - Signup and login
- **Demo Mode** - Works instantly, no backend needed
- **Firebase Integration** - Real multi-user support (optional)
- **Session Persistence** - Remember user across sessions
- **Automatic Mode Detection** - Firebase or Demo mode automatically

### 🎨 Design & Style
- **Contrast Color Scheme**: Orange (#FF6700) accents on dark black/gray (#000000, #121212)
- **Desktop-First Interface**: Three-column layout optimized for large screens
- **Responsive Design**: Adapts to tablets and smaller laptops
- **Modern Aesthetics**: Minimalist design with geometric elements

### 💬 Messaging
- Real-time text messaging via WebSocket
- Support for rich media (images, videos, files, audio)
- Drag & drop file uploads
- Voice messages
- Online/offline indicators
- Unread message counts
- Message timestamps

### 📞 Voice & Video Calls
- **WebRTC Technology**: Browser-based high-quality calls
- **Video Calls**: Peer-to-peer video communication
- **Audio Calls**: Voice-only communication
- **Call History**: Track all incoming and outgoing calls
- **In-app Call Window**: Modal overlay with video preview
- **Call Controls**: Mute, camera toggle, screen share

### 👥 Friends & Contacts
- Friends list with online status
- Add friends by ID/Username
- One-click ID copy
- Friend request system
- Block/unblock functionality
- Online indicators (orange dot)

### 🛠️ Developer Features
- **Developer Mode**: Toggle with keyboard shortcut
- **Debug Panel**: Real-time connection stats
- **Logs Viewer**: WebSocket and error logs
- **Performance Monitoring**: Check connection health
- **Error Tracking**: Automatic error reporting to Vercel

## Tech Stack

### Frontend
- **Framework**: Next.js 16.0.7
- **Language**: TypeScript 5
- **UI**: React 19.2.0
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 4.4.0
- **WebRTC**: Simple-peer 9.11.1
- **Icons**: Lucide React 0.263.1

### Infrastructure
- **Hosting**: Vercel
- **Real-time**: WebSocket
- **API**: Next.js API Routes
- **Monitoring**: Vercel Analytics & Error Tracking

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Deployment on Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📖 Documentation

Complete guides available:
- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 3 steps
- **[AUTHENTICATION.md](./AUTHENTICATION.md)** - Auth system & Firebase setup
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Deployment strategies
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was implemented

## 🚀 Deploy

### To Vercel (Recommended)
```bash
git push origin main
# Vercel auto-deploys
# Works with demo mode immediately
# Add Firebase env vars for production
```

### Local Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - Use freely!

---

**Fox Messenger** - Modern messaging for the modern web 🦊

🚀 **[Get Started Now →](./QUICKSTART.md)**

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
