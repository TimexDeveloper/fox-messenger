'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, Mic, MicOff, Video, VideoOff, Phone, Share2 } from 'lucide-react';

export function CallModal() {
  const activeCallId = useAppStore((s) => s.activeCallId);
  const endCall = useAppStore((s) => s.endCall);
  const chats = useAppStore((s) => s.chats);
  const currentUser = useAppStore((s) => s.currentUser);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  // Simulate call timer
  useEffect(() => {
    if (!activeCallId) return;
    
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCallId]);

  if (!activeCallId) return null;

  // Find the person we're calling
  const chat = chats.find((c) => c.id === activeCallId);
  const otherParticipant = chat?.participants.find((p) => p.id !== currentUser?.id);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-fox-darkgray rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-fox-gray-800">
        {/* Video Area */}
        <div className="relative bg-fox-black aspect-video flex items-center justify-center overflow-hidden">
          {/* Remote Video Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-fox-gray-800 to-fox-black flex items-center justify-center">
            <div className="text-center">
              <img
                src={otherParticipant?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg'}
                alt={otherParticipant?.username}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-fox-orange"
              />
              <p className="text-white text-xl font-semibold">{otherParticipant?.username}</p>
              <p className="text-fox-gray-500 mt-2">{formatTime(callDuration)}</p>
            </div>
          </div>

          {/* Local Video Corner */}
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-fox-gray-800 rounded-lg border-2 border-fox-orange overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-fox-gray-700">
              <img
                src={currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg'}
                alt="You"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className="bg-fox-black border-t border-fox-gray-800 p-6">
          <div className="flex items-center justify-center gap-4">
            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all ${
                isMuted
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-fox-gray-800 hover:bg-fox-gray-700'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <MicOff size={24} className="text-white" />
              ) : (
                <Mic size={24} className="text-white" />
              )}
            </button>

            {/* Video Button */}
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition-all ${
                isVideoOn
                  ? 'bg-fox-gray-800 hover:bg-fox-gray-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
              title={isVideoOn ? 'Stop Video' : 'Start Video'}
            >
              {isVideoOn ? (
                <Video size={24} className="text-white" />
              ) : (
                <VideoOff size={24} className="text-white" />
              )}
            </button>

            {/* Screen Share */}
            <button
              className="p-4 rounded-full bg-fox-gray-800 hover:bg-fox-gray-700 transition-all"
              title="Share Screen"
            >
              <Share2 size={24} className="text-white" />
            </button>

            {/* End Call Button */}
            <button
              onClick={() => {
                endCall();
                setCallDuration(0);
              }}
              className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-all"
              title="End Call"
            >
              <Phone size={24} className="text-white" />
            </button>
          </div>

          {/* Call Status */}
          <div className="mt-4 text-center">
            <p className="text-fox-gray-500 text-sm">
              Video call • {formatTime(callDuration)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
