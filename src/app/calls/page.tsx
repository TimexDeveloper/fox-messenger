'use client';

import { Sidebar } from '@/components/Sidebar';
import { DeveloperPanel } from '@/components/DeveloperPanel';
import { useAppStore } from '@/store/useAppStore';
import { useEffect, useState } from 'react';
import { Phone, VideoOff, Clock } from 'lucide-react';

const MOCK_USER = {
  id: 'user-123',
  username: 'Your Name',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  isOnline: true,
  status: 'Available',
};

const MOCK_CALL_HISTORY = [
  {
    id: '1',
    participant: {
      id: 'user-456',
      username: 'Alice Cooper',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
    type: 'video',
    duration: 1200,
    timestamp: new Date(Date.now() - 3600000),
    incoming: false,
  },
  {
    id: '2',
    participant: {
      id: 'user-789',
      username: 'Bob Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    },
    type: 'audio',
    duration: 420,
    timestamp: new Date(Date.now() - 7200000),
    incoming: true,
  },
  {
    id: '3',
    participant: {
      id: 'user-999',
      username: 'Charlie Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    },
    type: 'video',
    duration: 1800,
    timestamp: new Date(Date.now() - 86400000),
    incoming: false,
  },
];

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}

export default function CallsPage() {
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);
  const [callHistory] = useState(MOCK_CALL_HISTORY);

  useEffect(() => {
    setCurrentUser(MOCK_USER);
  }, [setCurrentUser]);

  return (
    <div className="flex h-screen bg-fox-darkgray">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-fox-gray-800 px-6 flex items-center bg-fox-black">
          <h1 className="text-2xl font-bold text-white">Call History</h1>
        </div>

        {/* Call History List */}
        <div className="flex-1 overflow-y-auto">
          {callHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Phone size={64} className="text-fox-gray-500 mx-auto mb-4" />
                <p className="text-fox-gray-500 text-lg">No call history yet</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 p-6">
              {callHistory.map((call) => (
                <div
                  key={call.id}
                  className="bg-fox-gray-800 hover:bg-fox-gray-700 rounded-lg p-4 flex items-center gap-4 transition-colors cursor-pointer group"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={call.participant.avatar}
                      alt={call.participant.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-fox-gray-700"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-fox-orange rounded-full flex items-center justify-center">
                      {call.type === 'video' ? (
                        <span className="text-xs">📹</span>
                      ) : (
                        <Phone size={12} className="text-fox-black" />
                      )}
                    </div>
                  </div>

                  {/* Call Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white truncate">
                        {call.participant.username}
                      </h3>
                      {call.incoming ? (
                        <span className="text-xs text-fox-orange">↓ Incoming</span>
                      ) : (
                        <span className="text-xs text-fox-gray-500">↑ Outgoing</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-fox-gray-500">
                      <Clock size={14} />
                      <span>{formatDuration(call.duration)}</span>
                      <span>•</span>
                      <span>
                        {call.timestamp.toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        {call.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Call Button */}
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-fox-orange hover:brightness-110 text-fox-black rounded-lg font-medium flex items-center gap-2">
                    <Phone size={16} />
                    Call
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DeveloperPanel />
    </div>
  );
}
