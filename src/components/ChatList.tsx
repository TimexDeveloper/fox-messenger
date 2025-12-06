'use client';

import { useAppStore } from '@/store/useAppStore';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function ChatList() {
  const chats = useAppStore((s) => s.chats);
  const selectedChatId = useAppStore((s) => s.selectedChatId);
  const selectChat = useAppStore((s) => s.selectChat);
  const currentUser = useAppStore((s) => s.currentUser);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.participants.some((p) =>
      p.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-80 bg-fox-black border-r border-fox-gray-800 flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-fox-gray-800">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-fox-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full bg-fox-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-fox-gray-700 focus:outline-none focus:border-fox-orange placeholder-fox-gray-500"
          />
        </div>
      </div>

      {/* Chat Items */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-4 text-center text-fox-gray-500">
            {chats.length === 0 ? 'No chats yet' : 'No matching chats'}
          </div>
        ) : (
          filteredChats.map((chat) => {
            const otherParticipant = chat.participants.find((p) => p.id !== currentUser?.id);
            const isSelected = selectedChatId === chat.id;
            const unreadCount = chat.unread;

            return (
              <button
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`w-full px-4 py-3 border-b border-fox-gray-800 text-left transition-colors hover:bg-fox-gray-800 ${
                  isSelected ? 'bg-fox-orange bg-opacity-10 border-l-4 border-l-fox-orange' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={otherParticipant?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg'}
                      alt={otherParticipant?.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-fox-gray-700"
                    />
                    {otherParticipant?.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-fox-orange rounded-full border border-fox-black"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2 mb-1">
                      <h3 className="font-semibold text-white truncate">
                        {otherParticipant?.username}
                      </h3>
                      <span className="text-xs text-fox-gray-500 flex-shrink-0">
                        {chat.lastMessage?.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-fox-gray-500 truncate">
                      {chat.lastMessage?.text || 'No messages yet'}
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <div className="flex-shrink-0 w-6 h-6 bg-fox-orange rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-fox-black">{unreadCount}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
