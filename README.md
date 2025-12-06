# Fox Messenger 🦊

A modern, functional, and stylish Single Page Application (SPA) messenger built with Next.js, TypeScript, and WebRTC.

## Features

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

---

**Fox Messenger** - Modern messaging for the modern web 🦊
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
