'use client';

import { Sidebar } from '@/components/Sidebar';
import { FriendsPanel } from '@/components/FriendsPanel';
import { DeveloperPanel } from '@/components/DeveloperPanel';
import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';
import { UserPlus, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

const MOCK_USER = {
  id: 'user-123',
  username: 'Your Name',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  isOnline: true,
  status: 'Available',
};

const MOCK_FRIENDS = [
  {
    id: 'user-456',
    username: 'Alice Cooper',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    isOnline: true,
    status: 'Available',
    addedAt: new Date(Date.now() - 86400000),
    blocked: false,
  },
  {
    id: 'user-789',
    username: 'Bob Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    isOnline: false,
    status: 'Away',
    addedAt: new Date(Date.now() - 172800000),
    blocked: false,
  },
  {
    id: 'user-999',
    username: 'Charlie Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    isOnline: true,
    status: 'In a call',
    addedAt: new Date(Date.now() - 259200000),
    blocked: false,
  },
];

export default function FriendsPage() {
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);
  const setFriends = useAppStore((s) => s.setFriends);

  useEffect(() => {
    setCurrentUser(MOCK_USER);
    setFriends(MOCK_FRIENDS);
  }, [setCurrentUser, setFriends]);

  return (
    <div className="flex h-screen bg-fox-darkgray">
      <Sidebar />
      <FriendsPanel />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <div className="text-8xl">👥</div>
          <h2 className="text-3xl font-bold text-white">Friends</h2>
          <p className="text-fox-gray-500 max-w-md">
            Your friends are listed on the left. Select a friend to start chatting or make a video call.
          </p>
          
          <div className="flex gap-4 justify-center mt-8">
            <button className="flex items-center gap-2 px-6 py-3 bg-fox-orange text-fox-black rounded-lg font-semibold hover:brightness-110 transition-all">
              <UserPlus size={20} />
              Add Friend
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-fox-gray-800 text-white rounded-lg font-semibold hover:bg-fox-gray-700 transition-all">
              <MessageCircle size={20} />
              New Chat
            </button>
          </div>
        </div>
      </div>

      <DeveloperPanel />
    </div>
  );
}
