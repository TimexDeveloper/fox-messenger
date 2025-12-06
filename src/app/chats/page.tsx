'use client';

import { Sidebar } from '@/components/Sidebar';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { CallModal } from '@/components/CallModal';
import { DeveloperPanel } from '@/components/DeveloperPanel';
import { useAppStore } from '@/store/useAppStore';
import { useAuth } from '@/lib/useAuth';
import { generateDemoMessages, MOCK_USERS } from '@/lib/demo-data';
import { useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function ChatsPage() {
  const { user, isCheckingAuth } = useAuth();
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);
  const setChats = useAppStore((s) => s.setChats);
  const selectedChatId = useAppStore((s) => s.selectedChatId);
  const selectChat = useAppStore((s) => s.selectChat);
  const setFriends = useAppStore((s) => s.setFriends);

  // Initialize app state with actual user and real demo messages
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

    // Create chats with real demo messages
    const demoChats = Object.entries(MOCK_USERS).map(([key, mockUser], index) => {
      const messages = generateDemoMessages(user.id, mockUser);
      
      return {
        id: `chat-${key}`,
        participants: [currentUser, mockUser],
        messages,
        lastMessage: messages[messages.length - 1],
        unread: 0,
      };
    });

    setChats(demoChats);

    // Set friends list from MOCK_USERS
    const mockFriends = Object.values(MOCK_USERS).map(mockUser => ({
      ...mockUser,
      addedAt: new Date(),
      blocked: false,
    }));
    
    setFriends(mockFriends);
    
    // Select first chat by default
    if (!selectedChatId && demoChats.length > 0) {
      selectChat(demoChats[0].id);
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
