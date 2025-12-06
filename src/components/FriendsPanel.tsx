'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Search, UserPlus, Copy, Check } from 'lucide-react';
import { Friend } from '@/store/useAppStore';

export function FriendsPanel() {
  const friends = useAppStore((s) => s.friends);
  const currentUser = useAppStore((s) => s.currentUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendId, setFriendId] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFriends = friends.filter(
    (friend) =>
      !friend.blocked &&
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add friend logic
    setFriendId('');
  };

  return (
    <div className="w-80 bg-fox-black border-r border-fox-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-fox-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Friends</h2>
          <button
            onClick={() => setShowAddFriend(!showAddFriend)}
            className="p-2 bg-fox-orange hover:bg-fox-orange hover:brightness-110 rounded-lg transition-all"
          >
            <UserPlus size={18} className="text-fox-black" />
          </button>
        </div>

        {/* Add Friend Form */}
        {showAddFriend && (
          <form onSubmit={handleAddFriend} className="mb-4">
            <div className="space-y-2">
              <input
                type="text"
                value={friendId}
                onChange={(e) => setFriendId(e.target.value)}
                placeholder="Enter friend ID..."
                className="w-full bg-fox-gray-800 text-white px-3 py-2 rounded-lg border border-fox-gray-700 focus:outline-none focus:border-fox-orange placeholder-fox-gray-500 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-fox-orange text-fox-black px-3 py-2 rounded-lg font-medium hover:brightness-110 transition-all"
              >
                Add Friend
              </button>
            </div>
          </form>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-fox-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends..."
            className="w-full bg-fox-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-fox-gray-700 focus:outline-none focus:border-fox-orange placeholder-fox-gray-500"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        {filteredFriends.length === 0 ? (
          <div className="p-4 text-center text-fox-gray-500">
            {friends.length === 0 ? 'No friends yet' : 'No matching friends'}
          </div>
        ) : (
          filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="px-4 py-3 border-b border-fox-gray-800 hover:bg-fox-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={friend.avatar || 'https://api.dicebear.com/7.x/avataaars/svg'}
                    alt={friend.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-fox-gray-700"
                  />
                  {friend.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-fox-orange rounded-full border border-fox-black"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{friend.username}</h3>
                  <p className="text-xs text-fox-gray-500">
                    {friend.isOnline ? '🟢 Online' : '⚫ Offline'}
                  </p>
                </div>

                <button
                  onClick={() => handleCopyId(friend.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-fox-gray-700 rounded-lg"
                  title="Copy ID"
                >
                  {copiedId === friend.id ? (
                    <Check size={16} className="text-fox-orange" />
                  ) : (
                    <Copy size={16} className="text-fox-gray-500" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Your ID Section */}
      {currentUser && (
        <div className="p-4 border-t border-fox-gray-800 bg-fox-gray-800 bg-opacity-50">
          <p className="text-xs text-fox-gray-500 mb-2">Your ID</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-fox-black px-3 py-2 rounded text-sm text-fox-orange font-mono truncate">
              {currentUser.id}
            </code>
            <button
              onClick={() => handleCopyId(currentUser.id)}
              className="p-2 hover:bg-fox-gray-700 rounded transition-colors"
            >
              {copiedId === currentUser.id ? (
                <Check size={16} className="text-fox-orange" />
              ) : (
                <Copy size={16} className="text-fox-gray-500" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
