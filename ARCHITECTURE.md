# Fox Messenger - Architecture Guide

## System Overview

Fox Messenger is a modern Single Page Application (SPA) messenger built with Next.js and optimized for Vercel deployment.

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │           React Components (SPA)                   │  │
│  │  ┌─────────────┬──────────────┬────────────────┐  │  │
│  │  │  Sidebar    │  Chat List   │  Chat Window   │  │  │
│  │  │  Friends    │  Call Modal  │  Developer     │  │  │
│  │  └─────────────┴──────────────┴────────────────┘  │  │
│  │                                                      │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │      Zustand State Management               │  │  │
│  │  │  (chats, friends, calls, messages, etc)     │  │  │
│  │  └──────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
         ↓↑ (HTTP/WebSocket)        ↓↑ (WebRTC)
┌─────────────────────────────────────────────────────────┐
│            Next.js Server (Vercel)                       │
│  ┌─────────────────────────────────────────────────┐  │
│  │      API Routes (/api/*)                        │  │
│  │  • /api/debug/report-error                      │  │
│  │  • /api/webrtc/signal                           │  │
│  │  • /api/health                                  │  │
│  └─────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────┐  │
│  │      Middleware & Utilities                     │  │
│  │  • Error Tracking                               │  │
│  │  • Request Logging                              │  │
│  │  • CORS Handling                                │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
         ↓↑ (WebSocket/TCP)       ↓↑ (P2P)
┌──────────────────────────────────────────────────────────┐
│         External Services (Optional)                      │
│  • WebSocket Server (Node.js/Socket.io)                 │
│  • Database (MongoDB/PostgreSQL)                        │
│  • TURN/STUN Servers (WebRTC)                          │
│  • File Storage (AWS S3/Vercel Blob)                   │
└──────────────────────────────────────────────────────────┘
```

## Component Architecture

### Core Components

#### `Sidebar.tsx`
- Left navigation panel
- User profile section
- Navigation links
- Developer mode toggle

#### `ChatList.tsx`
- List of active chats
- Search functionality
- Unread indicators
- Last message preview

#### `ChatWindow.tsx`
- Main chat interface
- Message history
- Message input with attachments
- Voice message recording
- Real-time message display

#### `FriendsPanel.tsx`
- Friends list
- Add friend form
- Online status indicators
- ID copy functionality

#### `CallModal.tsx`
- Full-screen video/audio call interface
- Remote video display
- Local video preview
- Call controls (mute, video, screen share)
- Call duration timer

#### `DeveloperPanel.tsx`
- Debug info display
- Log viewer
- Connection statistics
- Error tracking
- Chat inspection

### State Management (Zustand)

```typescript
AppStore {
  currentUser: User
  chats: Chat[]
  friends: Friend[]
  selectedChatId: string
  activeCallId: string
  isDeveloperMode: boolean
  
  actions: {
    setCurrentUser()
    setChats()
    selectChat()
    addMessage()
    startCall()
    endCall()
    toggleDeveloperMode()
    setUserOnlineStatus()
  }
}
```

## Data Flow

### Messaging Flow
1. User types message in ChatWindow
2. Message added to local state (Zustand)
3. Message sent via WebSocket to server
4. Server broadcasts to recipient
5. Recipient receives and updates UI in real-time

### Call Initiation Flow
1. User clicks call button in ChatList
2. `startCall()` action triggered in store
3. CallModal mounts and displays
4. WebRTC signaling begins via `/api/webrtc/signal`
5. P2P connection established
6. Audio/video streams displayed

### Online Status Flow
1. User comes online
2. WebSocket sends presence update
3. Server broadcasts online status
4. Other clients receive update
5. Orange indicator appears on friends
6. Friends list re-renders

## API Endpoints

### `POST /api/debug/report-error`
Reports client-side errors to server for monitoring.

**Request:**
```json
{
  "message": "Error message",
  "stack": "Stack trace",
  "userAgent": "Browser info",
  "timestamp": "ISO string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Error reported"
}
```

### `POST /api/webrtc/signal`
Handles WebRTC signaling for peer connections.

**Request:**
```json
{
  "userId": "user-123",
  "callId": "call-456",
  "roomId": "room-789",
  "type": "offer|answer|ice-candidate"
}
```

**Response:**
```json
{
  "success": true,
  "roomId": "room-789"
}
```

### `GET /api/health`
Returns server health and statistics.

**Response:**
```json
{
  "timestamp": "2025-01-01T00:00:00Z",
  "activeConnections": 42,
  "totalMessages": 5234,
  "activeCalls": 3,
  "avgLatency": "45ms",
  "status": "healthy",
  "version": "0.1.0",
  "hosting": "Vercel"
}
```

## WebRTC Implementation

### Signaling Process
1. Initiator creates offer → sends to peer via `/api/webrtc/signal`
2. Peer receives offer → creates answer → sends back
3. Both peers exchange ICE candidates
4. Direct P2P connection established
5. Media streams transmitted

### Supported Media Types
- Audio (microphone)
- Video (camera)
- Screen Share (desktop capture)
- Data Channel (text/low-latency messaging)

## Security Considerations

### Current Implementation (Demo)
- No authentication
- No encryption
- Mock data only
- CORS enabled for local development

### Production Recommendations
- [ ] Implement JWT authentication
- [ ] Add end-to-end encryption (E2EE)
- [ ] Use HTTPS/WSS only
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Use CORS allowlist
- [ ] Enable CSRF protection
- [ ] Implement DDoS protection (Vercel Shield)

## Performance Optimizations

### Current
- Next.js SWC compiler for fast builds
- Image optimization via Next Image
- CSS purging with Tailwind
- Client-side state with Zustand (no re-renders on unchanged data)
- Component code splitting

### Recommended
- [ ] Implement service workers for PWA
- [ ] Add compression middleware
- [ ] Enable caching headers
- [ ] Optimize WebRTC codec selection
- [ ] Implement message pagination
- [ ] Add IndexedDB for offline storage

## Deployment Architecture (Vercel)

```
┌──────────────────────────────────┐
│   Vercel Edge Network            │
│  (Global CDN for static assets)  │
└────────────┬─────────────────────┘
             ↓
┌──────────────────────────────────┐
│   Vercel Serverless Functions    │
│  (Next.js API Routes)            │
└────────────┬─────────────────────┘
             ↓
┌──────────────────────────────────┐
│   Optional Services              │
│  • External WebSocket Server     │
│  • Database                      │
│  • File Storage                  │
└──────────────────────────────────┘
```

### Environment Variables (Vercel)
```
NEXT_PUBLIC_API_URL=https://[project].vercel.app
NEXT_PUBLIC_WS_URL=wss://[websocket-server].com
NODE_ENV=production
```

## Monitoring & Debugging

### Developer Mode Features
- Real-time WebSocket status
- RTC connection count
- Message queue depth
- Connection latency
- Logs viewer with filtering
- Error tracking and reporting
- Chat data inspection

### Error Reporting
Errors automatically sent to `/api/debug/report-error` for:
- Uncaught exceptions
- WebRTC errors
- WebSocket disconnections
- User interactions errors

### Vercel Monitoring
- Access Vercel Analytics dashboard
- View function invocations
- Monitor execution time
- Track error rates
- Set up Slack notifications

## Future Enhancements

### Short Term
- [ ] User authentication
- [ ] Database persistence
- [ ] WebSocket server deployment
- [ ] File upload to cloud storage
- [ ] Group chats

### Medium Term
- [ ] End-to-end encryption
- [ ] Message reactions
- [ ] Rich text editor
- [ ] Mobile responsive UI
- [ ] Offline mode

### Long Term
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Bot framework
- [ ] API for third-party integrations
- [ ] Voice transcription
- [ ] AI-powered features

## Troubleshooting

### Development Issues
- **WebSocket not connecting**: Check `.env.local` for correct WS_URL
- **Build errors**: Clear `.next` folder and reinstall dependencies
- **Hot reload not working**: Verify file save is enabled in editor

### Production Issues
- **High latency**: Check Vercel region selection
- **RTC connection fails**: Verify TURN/STUN servers configured
- **Memory leaks**: Check browser DevTools for event listener cleanup

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [WebRTC MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)
