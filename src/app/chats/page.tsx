'use client';

import { Sidebar } from '@/components/Sidebar';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { CallModal } from '@/components/CallModal';
import { DeveloperPanel } from '@/components/DeveloperPanel';
import { useAppStore } from '@/store/useAppStore';
import { useAuth } from '@/lib/useAuth';
import { useEffect } from 'react';

export const dynamic = 'force-dynamic';

// Mock data for demo
const generateMockUser = (id: string, username: string, seed: string) => ({
  id,
  username,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
  isOnline: Math.random() > 0.5,
  status: Math.random() > 0.5 ? 'Available' : 'Away',
});

const MOCK_USER = generateMockUser('user-123', 'Your Name', 'Felix');

const MOCK_CHATS = [
  {
    id: 'chat-1',
    participants: [
      MOCK_USER,
      generateMockUser('user-456', 'Alice Cooper', 'Alice'),
    ],
    messages: [
      {
        id: 'msg-1',
        sender: generateMockUser('user-456', 'Alice Cooper', 'Alice'),
        text: 'Hey! How are you?',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 'msg-2',
        sender: MOCK_USER,
        text: 'I\'m doing great! How about you?',
        timestamp: new Date(Date.now() - 3300000),
      },
      {
        id: 'msg-3',
        sender: generateMockUser('user-456', 'Alice Cooper', 'Alice'),
        text: 'Pretty good! Let\'s catch up soon 🦊',
        timestamp: new Date(Date.now() - 3000000),
      },
    ],
    lastMessage: {
      id: 'msg-3',
      sender: generateMockUser('user-456', 'Alice Cooper', 'Alice'),
      text: 'Pretty good! Let\'s catch up soon 🦊',
      timestamp: new Date(Date.now() - 3000000),
    },
    unread: 0,
  },
  {
    id: 'chat-2',
    participants: [
      MOCK_USER,
      generateMockUser('user-789', 'Bob Smith', 'Bob'),
    ],
    messages: [
      {
        id: 'msg-4',
        sender: MOCK_USER,
        text: 'Hi Bob! Available for a call?',
        timestamp: new Date(Date.now() - 7200000),
      },
    ],
    lastMessage: {
      id: 'msg-4',
      sender: MOCK_USER,
      text: 'Hi Bob! Available for a call?',
      timestamp: new Date(Date.now() - 7200000),
    },
    unread: 1,
  },
  {
    id: 'chat-3',
    participants: [
      MOCK_USER,
      generateMockUser('user-999', 'Charlie Brown', 'Charlie'),
    ],
    messages: [
      {
        id: 'msg-5',
        sender: generateMockUser('user-999', 'Charlie Brown', 'Charlie'),
        text: 'Don\'t forget about tomorrow!',
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
    lastMessage: {
      id: 'msg-5',
      sender: generateMockUser('user-999', 'Charlie Brown', 'Charlie'),
      text: 'Don\'t forget about tomorrow!',
      timestamp: new Date(Date.now() - 86400000),
    },
    unread: 0,
  },
];

export default function ChatsPage() {
  const { user, isCheckingAuth } = useAuth();
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);
  const setChats = useAppStore((s) => s.setChats);
  const selectedChatId = useAppStore((s) => s.selectedChatId);
  const selectChat = useAppStore((s) => s.selectChat);
  const setFriends = useAppStore((s) => s.setFriends);

  // Initialize app state with actual user
  useEffect(() => {
    if (isCheckingAuth || !user) return;

    // Use real authenticated user
    const currentUser = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      isOnline: true,
      status: 'Available',
    };

    setCurrentUser(currentUser);
    setChats(MOCK_CHATS);

    // Add mock friends with proper Friend interface
    const mockFriends = [
      { ...generateMockUser('user-456', 'Alice Cooper', 'Alice'), addedAt: new Date(), blocked: false },
      { ...generateMockUser('user-789', 'Bob Smith', 'Bob'), addedAt: new Date(), blocked: false },
      { ...generateMockUser('user-999', 'Charlie Brown', 'Charlie'), addedAt: new Date(), blocked: false },
      { ...generateMockUser('user-111', 'Diana Prince', 'Diana'), addedAt: new Date(), blocked: false },
    ];
    setFriends(mockFriends);
    
    // Select first chat by default
    if (!selectedChatId && MOCK_CHATS.length > 0) {
      selectChat(MOCK_CHATS[0].id);
    }
  }, [isCheckingAuth, user, setCurrentUser, setChats, selectedChatId, selectChat, setFriends]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-fox-darkgray">
        <div className="text-center">
          <div className="text-6xl mb-4">🦊</div>
          <p className="text-fox-gray-500">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-fox-darkgray">
      <Sidebar />
      <ChatList />
      <ChatWindow />
      <CallModal />
      <DeveloperPanel />
    </div>
  );
}
