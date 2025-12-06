# 🎨 Fox Messenger - UI/UX Mockups & Screenshots

## Цветовая Палитра

```
Primary Black:     #000000
Dark Gray:         #121212
Orange Accent:     #FF6700
Gray 800:          #1a1a1a
Gray 700:          #2a2a2a
Gray 600:          #3a3a3a
Gray 500:          #4a4a4a
```

## 📐 Layout Structure

### Three-Column Desktop Layout

```
┌─────────────────────────────────────────────────────────────┐
│                     Fox Messenger                            │
├─────────────────┬──────────────────┬──────────────────────┤
│                 │                  │                      │
│  SIDEBAR        │   CHAT LIST      │   CHAT WINDOW        │
│  (width: 256px) │  (width: 320px)  │  (flex: 1)           │
│                 │                  │                      │
│  Navigation     │  Search          │  Message History     │
│  • Chats        │  Active Chats    │  (scrollable)        │
│  • Friends      │  Last Message    │                      │
│  • Calls        │  Unread Count    │  Message Input       │
│  • Settings     │  Online Status   │  • Text              │
│                 │  User Avatar     │  • Attach            │
│  User Profile   │                  │  • Voice             │
│  • Avatar       │                  │  • Send              │
│  • Name         │                  │                      │
│  • Status       │                  │                      │
│                 │                  │                      │
│  Dev Mode       │                  │                      │
│                 │                  │                      │
└─────────────────┴──────────────────┴──────────────────────┘

Width: 1920px recommended
Height: 1080px recommended
```

## 🖼️ Screen Mockups

### Screen 1: Main Chat Page (/chats)

```
┌────────────────────────────────────────────────────────────────┐
│ ┌─────────────────┐ ┌──────────────────┐ ┌─────────────────────┐
│ │ 🦊 FOX          │ │ 🔍 Search chats  │ │ Alice Cooper    🟢  │
│ │ Messenger       │ │                  │ │ Online              │
│ │ ─────────────── │ │ ─────────────────│ │ ─────────────────────│
│ │                 │ │                  │ │                     │
│ │ 👤 You          │ │ 🔶 Alice Cooper  │ │ Chat with Alice     │
│ │ Online      🟠  │ │ Online      🟢   │ │ 2:34 PM             │
│ │                 │ │ Pretty good! ✨  │ │                     │
│ │ ─────────────── │ │ ─────────────────│ │ ┌─────────────────┐ │
│ │                 │ │                  │ │ │ Hey! How are    │ │
│ │ 💬 Chats    🟠  │ │ 👤 Bob Smith     │ │ │ you?      14:32 │ │
│ │ 👥 Friends      │ │ Away         ⚫   │ │ └─────────────────┘ │
│ │ 📞 Calls        │ │ Hi Bob! Availa.. │ │                 🟠  │
│ │ ⚙️  Settings     │ │ ─────────────────│ │ ┌─────────────────┐ │
│ │ ⚙️  Dev Mode ON  │ │                  │ │ │ I'm doing great │ │
│ │                 │ │                  │ │ │ How about you?  │ │
│ │ 🔴 Logout       │ │                  │ │ │          14:35  │ │
│ │                 │ │                  │ │ └─────────────────┘ │
│ │                 │ │                  │ │                     │
│ │                 │ │                  │ │ ┌─────────────────┐ │
│ │                 │ │                  │ │ │ Pretty good!    │ │
│ │                 │ │                  │ │ │ Let's catch up  │ │
│ │                 │ │                  │ │ │ soon 🦊   14:38 │ │
│ │                 │ │                  │ │ └─────────────────┘ │
│ │                 │ │                  │ │                 🟢  │
│ │                 │ │                  │ │ ─────────────────────│
│ │                 │ │                  │ │                     │
│ │                 │ │                  │ │ ┌─────────────────┐ │
│ │                 │ │                  │ │ │ Message...  📎  │ │
│ │                 │ │                  │ │ │ 🎤 📤 🟠      │ │
│ │                 │ │                  │ │ └─────────────────┘ │
│ └─────────────────┘ └──────────────────┘ └─────────────────────┘
└────────────────────────────────────────────────────────────────┘
```

### Screen 2: Friends Page (/friends)

```
┌────────────────────────────────────────────────────────────────┐
│ ┌─────────────────┐ ┌──────────────────┐ ┌─────────────────────┐
│ │ 🦊 FOX          │ │ Friends     🟠   │ │        👥           │
│ │ Messenger       │ │ 🔍 Search friends│ │     FRIENDS         │
│ │ ─────────────── │ │ ─────────────────│ │                     │
│ │                 │ │                  │ │ Select a friend to  │
│ │ 👤 You          │ │ 👤 Alice Cooper  │ │ start chatting or   │
│ │ Online      🟠  │ │ Online      🟢   │ │ make a video call   │
│ │                 │ │ Added 1d ago     │ │                     │
│ │ ─────────────── │ │                  │ │ ┌─────────────────┐ │
│ │                 │ │ 👤 Bob Smith     │ │ │ 🟠 Add Friend   │ │
│ │ 💬 Chats    🟠  │ │ Away         ⚫   │ │ └─────────────────┘ │
│ │ 👥 Friends  🟠  │ │ Added 2d ago     │ │ ┌─────────────────┐ │
│ │ 📞 Calls        │ │                  │ │ │ 💬 New Chat     │ │
│ │ ⚙️  Settings     │ │ 👤 Charlie Brown │ │ └─────────────────┘ │
│ │ ⚙️  Dev Mode     │ │ Online      🟢   │ │                     │
│ │                 │ │ Added 3d ago     │ │                     │
│ │ Your ID:        │ │                  │ │                     │
│ │ user-123  📋    │ │                  │ │                     │
│ │ (click to copy) │ │                  │ │                     │
│ │                 │ │                  │ │                     │
│ │                 │ │                  │ │                     │
│ │                 │ │                  │ │                     │
│ │                 │ │                  │ │                     │
│ └─────────────────┘ └──────────────────┘ └─────────────────────┘
└────────────────────────────────────────────────────────────────┘
```

### Screen 3: Call Modal (Overlay)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                  │
│        ┌──────────────────────────────────────────┐             │
│        │                                          │             │
│        │    ┌────────────────────────────────┐   │             │
│        │    │                                │   │             │
│        │    │    Alice Cooper on Video Call  │   │             │
│        │    │                                │   │             │
│        │    │          👤 Avatar             │   │             │
│        │    │                                │   │             │
│        │    │        Duration: 03:45         │   │             │
│        │    │                                │   │             │
│        │    │     ┌──────────────────┐       │   │             │
│        │    │     │    Your Camera   │       │   │             │
│        │    │     │    (corner view) │       │   │             │
│        │    │     └──────────────────┘       │   │             │
│        │    │                                │   │             │
│        │    └────────────────────────────────┘   │             │
│        │                                          │             │
│        │    ┌────────────────────────────────┐   │             │
│        │    │  🎤  📹  📲  ❌                 │   │             │
│        │    │  Mute Video Share End          │   │             │
│        │    │  Video call • 03:45            │   │             │
│        │    └────────────────────────────────┘   │             │
│        │                                          │             │
│        └──────────────────────────────────────────┘             │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### Screen 4: Calls History (/calls)

```
┌────────────────────────────────────────────────────────────────┐
│ ┌─────────────────┐ ┌──────────────────┐ ┌─────────────────────┐
│ │ 🦊 FOX          │                    │ Call History        │
│ │ Messenger       │                    │ ─────────────────────│
│ │ ─────────────── │                    │                     │
│ │                 │                    │ 📹 Alice Cooper 🟢  │
│ │ 👤 You          │                    │ ↓ Incoming, 20m 3s  │
│ │ Online      🟠  │                    │ Dec 3, 14:32  [CALL]│
│ │                 │                    │ ─────────────────────│
│ │ ─────────────── │                    │                     │
│ │                 │                    │ 🎤 Bob Smith   ⚫   │
│ │ 💬 Chats    🟠  │                    │ ↑ Outgoing, 7m 2s   │
│ │ 👥 Friends      │                    │ Dec 2, 18:15  [CALL]│
│ │ 📞 Calls    🟠  │                    │ ─────────────────────│
│ │ ⚙️  Settings     │                    │                     │
│ │ ⚙️  Dev Mode     │                    │ 📹 Charlie Brown 🟢│
│ │                 │                    │ ↓ Incoming, 30m 15s │
│ │ 🔴 Logout       │                    │ Dec 1, 20:45  [CALL]│
│ │                 │                    │ ─────────────────────│
│ │                 │                    │                     │
│ │                 │                    │                     │
│ │                 │                    │                     │
│ │                 │                    │                     │
│ │                 │                    │                     │
│ │                 │                    │                     │
│ │                 │                    │                     │
│ └─────────────────┘ └──────────────────┘ └─────────────────────┘
└────────────────────────────────────────────────────────────────┘
```

### Screen 5: Settings Page (/settings)

```
┌────────────────────────────────────────────────────────────────┐
│ ┌─────────────────┐ ┌──────────────────┐ ┌─────────────────────┐
│ │ 🦊 FOX          │                    │ ⚙️  Settings        │
│ │ Messenger       │                    │ ─────────────────────│
│ │ ─────────────── │                    │                     │
│ │                 │                    │ 👤 ACCOUNT          │
│ │ 👤 You          │                    │ Username: Your Name │
│ │ Online      🟠  │                    │ Status:   Available │
│ │                 │                    │                     │
│ │ ─────────────── │                    │ 🔒 PRIVACY         │
│ │                 │                    │ ☑ Private Messages │
│ │ 💬 Chats    🟠  │                    │ ☑ Show Online      │
│ │ 👥 Friends  🟠  │                    │ ☑ Read Receipts    │
│ │ 📞 Calls        │                    │                     │
│ │ ⚙️  Settings  🟠 │                    │ 🔔 NOTIFICATIONS   │
│ │ ⚙️  Dev Mode     │                    │ ☑ Messages         │
│ │                 │                    │ ☑ Calls            │
│ │ 🔴 Logout       │                    │ ☑ Sound            │
│ │                 │                    │                     │
│ │                 │                    │ 🔊 AUDIO & VIDEO   │
│ │                 │                    │ Microphone: Default │
│ │                 │                    │ Camera: Default     │
│ │                 │                    │                     │
│ │                 │                    │ 🗑️  DATA            │
│ │                 │                    │ [Clear Cache]       │
│ │                 │                    │ [Delete All Data]   │
│ └─────────────────┘ └──────────────────┘ └─────────────────────┘
└────────────────────────────────────────────────────────────────┘
```

### Screen 6: Developer Panel

```
┌──────────────────────────────────────────┐
│ 🟠 ⚙️  Developer Panel           DEV MODE│
├──────────────────────────────────────────┤
│                                          │
│ 📊 Debug Info ▼                          │
│   WS Connected: ✅                      │
│   RTC Connections: 3                    │
│   Messages Queued: 0                    │
│   Timestamp: 14:35:22                   │
│                                          │
│ 📝 Logs (20) ▼                          │
│   [INFO] WebSocket connected      📋   │
│   [WARN] High latency detected    📋   │
│   [INFO] Message sent to Alice    📋   │
│   [ERROR] Failed to join call     📋   │
│                                          │
│ 💬 Chats (2) ▶                          │
│                                          │
├──────────────────────────────────────────┤
│ Running on Vercel • Fox v0.1.0          │
└──────────────────────────────────────────┘
```

## 🎨 Color Usage

### Primary Elements
- **Navigation Active**: #FF6700 (orange)
- **Online Indicator**: #FF6700 (orange dot)
- **Buttons (Primary)**: #FF6700 background
- **Links (Active)**: #FF6700 text

### Secondary Elements
- **Backgrounds**: #000000, #121212
- **Panel Backgrounds**: #1a1a1a (gray-800)
- **Hover States**: #2a2a2a (gray-700)
- **Borders**: #3a3a3a (gray-600)
- **Text (Primary)**: #FFFFFF (white)
- **Text (Secondary)**: #B4B4B4 (gray-500)

## 📐 Typography

- **Logo/Heading**: 20-24px, Bold
- **Page Title**: 28px, Bold
- **Section Title**: 18px, Semibold
- **Body Text**: 14px, Regular
- **Caption**: 12px, Regular

## 🔲 Component Sizes

- **Sidebar Width**: 256px
- **Chat List Width**: 320px
- **Avatar Size**: 12px (indicator), 40px (list), 128px (call modal)
- **Button Height**: 40px
- **Input Height**: 40px
- **Message Bubble Max Width**: 60% of container

## ✨ Interactive States

### Buttons
- **Default**: gray-800 background, white text
- **Hover**: gray-700 background
- **Active**: orange background, black text
- **Disabled**: 50% opacity

### Input Fields
- **Default**: gray-800 background, gray-700 border
- **Focus**: gray-800 background, orange border
- **Placeholder**: gray-500 text

### Chat Bubbles
- **Sent**: orange background, black text
- **Received**: gray-800 background, white text

## 🎯 Responsive Breakpoints

- **Desktop**: 1920px and above (optimal)
- **Laptop**: 1366px - 1919px (supported)
- **Tablet**: 768px - 1365px (supported)
- **Mobile**: Below 768px (limited support)

---

**Fox Messenger Design System** 🦊
