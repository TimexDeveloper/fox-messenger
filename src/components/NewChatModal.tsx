'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Plus, X } from 'lucide-react';

export function NewChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const friends = useAppStore((s) => s.friends);
  const chats = useAppStore((s) => s.chats);
  const selectChat = useAppStore((s) => s.selectChat);

  const handleCreateChat = () => {
    if (selectedFriends.length === 0) return;

    const selectedFriendsData = friends.filter(f => selectedFriends.includes(f.id));
    const chatName = selectedFriendsData.map(f => f.username).join(', ');

    // Check if chat already exists
    const existingChat = chats.find(c =>
      c.participants.every(p => selectedFriendsData.some(f => f.id === p.id)) ||
      selectedFriendsData.every(f => c.participants.some(p => p.id === f.id))
    );

    if (existingChat) {
      selectChat(existingChat.id);
      setIsOpen(false);
      return;
    }

    // Create new chat
    const newChat = {
      id: `chat-${Date.now()}`,
      participants: selectedFriendsData,
      messages: [],
      unread: 0,
    };

    useAppStore.setState({
      chats: [...chats, newChat],
    });

    selectChat(newChat.id);
    setSelectedFriends([]);
    setIsOpen(false);
  };

  const toggleFriend = (friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-2 px-4 py-2 bg-fox-orange hover:brightness-110 text-fox-black font-semibold rounded-lg transition-all"
      >
        <Plus size={18} /> New Chat
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-fox-gray-800 rounded-lg p-6 w-96 border border-fox-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Select Friends</h2>
          <button
            onClick={() => {
              setIsOpen(false);
              setSelectedFriends([]);
            }}
            className="text-fox-gray-500 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
          {friends.map(friend => (
            <div
              key={friend.id}
              onClick={() => toggleFriend(friend.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedFriends.includes(friend.id)
                  ? 'bg-fox-orange bg-opacity-20 border border-fox-orange'
                  : 'hover:bg-fox-gray-700'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFriends.includes(friend.id)}
                onChange={() => toggleFriend(friend.id)}
                className="w-4 h-4 rounded accent-fox-orange"
              />
              <img
                src={friend.avatar}
                alt={friend.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white">{friend.username}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsOpen(false);
              setSelectedFriends([]);
            }}
            className="flex-1 px-4 py-2 bg-fox-gray-700 hover:bg-fox-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateChat}
            disabled={selectedFriends.length === 0}
            className="flex-1 px-4 py-2 bg-fox-orange hover:brightness-110 disabled:opacity-50 text-fox-black font-semibold rounded-lg transition-all"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
}
