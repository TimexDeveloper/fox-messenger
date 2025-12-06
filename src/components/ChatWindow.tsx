'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';
import { Message } from '@/store/useAppStore';

export function ChatWindow() {
  const selectedChatId = useAppStore((s) => s.selectedChatId);
  const chats = useAppStore((s) => s.chats);
  const addMessage = useAppStore((s) => s.addMessage);
  const currentUser = useAppStore((s) => s.currentUser);
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const chat = chats.find((c) => c.id === selectedChatId);

  if (!chat || !currentUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-fox-darkgray">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-fox-gray-500 text-lg">Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: currentUser,
      text: messageText,
      timestamp: new Date(),
    };

    addMessage(selectedChatId!, newMessage);
    setMessageText('');
  };

  const handleAttachment = () => {
    // TODO: Implement file upload
  };

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording);
  };

  const otherParticipant = chat.participants.find((p) => p.id !== currentUser.id);

  return (
    <div className="flex-1 flex flex-col bg-fox-darkgray">
      {/* Chat Header */}
      <div className="h-16 border-b border-fox-gray-800 px-6 flex items-center justify-between bg-fox-black">
        <div className="flex items-center gap-3">
          {otherParticipant && (
            <>
              <div className="relative">
                <img
                  src={otherParticipant.avatar || 'https://api.dicebear.com/7.x/avataaars/svg'}
                  alt={otherParticipant.username}
                  className="w-10 h-10 rounded-full object-cover border-2 border-fox-gray-700"
                />
                {otherParticipant.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-fox-orange rounded-full border border-fox-black"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-white">{otherParticipant.username}</h2>
                <p className="text-xs text-fox-gray-500">
                  {otherParticipant.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-fox-gray-800 rounded-lg transition-colors">
            <Smile size={20} className="text-fox-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-fox-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          chat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender.id === currentUser.id
                    ? 'bg-fox-orange text-fox-black'
                    : 'bg-fox-gray-800 text-white'
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-fox-gray-800 p-4 bg-fox-black">
        <div className="flex items-end gap-3">
          <button
            onClick={handleAttachment}
            className="p-2 hover:bg-fox-gray-800 rounded-lg transition-colors"
          >
            <Paperclip size={20} className="text-fox-gray-500" />
          </button>

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-fox-gray-800 text-white px-4 py-2 rounded-lg border border-fox-gray-700 focus:outline-none focus:border-fox-orange transition-colors placeholder-fox-gray-500"
          />

          <button
            onClick={handleVoiceMessage}
            className={`p-2 rounded-lg transition-colors ${
              isRecording ? 'bg-fox-orange' : 'hover:bg-fox-gray-800'
            }`}
          >
            <Mic size={20} className={isRecording ? 'text-fox-black' : 'text-fox-gray-500'} />
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="p-2 bg-fox-orange hover:bg-fox-orange hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
          >
            <Send size={20} className="text-fox-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
