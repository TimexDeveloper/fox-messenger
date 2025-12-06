'use client';

import { Sidebar } from '@/components/Sidebar';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { CallModal } from '@/components/CallModal';
import { DeveloperPanel } from '@/components/DeveloperPanel';
import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';

// Mock data for demo
const MOCK_USER = {
  id: 'user-123',
  username: 'Your Name',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  isOnline: true,
  status: 'Available',
};

const MOCK_CHATS = [
  {
    id: 'chat-1',
    participants: [
      MOCK_USER,
      {
        id: 'user-456',
        username: 'Alice Cooper',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        isOnline: true,
        status: 'Available',
      },
    ],
    messages: [
      {
        id: 'msg-1',
        sender: {
          id: 'user-456',
          username: 'Alice Cooper',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
          isOnline: true,
        },
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
        sender: {
          id: 'user-456',
          username: 'Alice Cooper',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
          isOnline: true,
        },
        text: 'Pretty good! Let\'s catch up soon 🦊',
        timestamp: new Date(Date.now() - 3000000),
      },
    ],
    lastMessage: {
      id: 'msg-3',
      sender: {
        id: 'user-456',
        username: 'Alice Cooper',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        isOnline: true,
      },
      text: 'Pretty good! Let\'s catch up soon 🦊',
      timestamp: new Date(Date.now() - 3000000),
    },
    unread: 0,
  },
  {
    id: 'chat-2',
    participants: [
      MOCK_USER,
      {
        id: 'user-789',
        username: 'Bob Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        isOnline: false,
        status: 'Away',
      },
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
    unread: 0,
  },
];

export default function ChatsPage() {
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);
  const setChats = useAppStore((s) => s.setChats);
  const selectedChatId = useAppStore((s) => s.selectedChatId);
  const selectChat = useAppStore((s) => s.selectChat);

  // Initialize app state
  useEffect(() => {
    setCurrentUser(MOCK_USER);
    setChats(MOCK_CHATS);
    
    // Select first chat by default
    if (!selectedChatId && MOCK_CHATS.length > 0) {
      selectChat(MOCK_CHATS[0].id);
    }
  }, [setCurrentUser, setChats, selectedChatId, selectChat]);

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
