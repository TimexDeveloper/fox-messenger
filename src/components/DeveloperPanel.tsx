'use client';

import { useAppStore } from '@/store/useAppStore';
import { DebugManager } from '@/lib/debug';
import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function DeveloperPanel() {
  const isDeveloperMode = useAppStore((s) => s.isDeveloperMode);
  const chats = useAppStore((s) => s.chats);
  const currentUser = useAppStore((s) => s.currentUser);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    debug: true,
    logs: true,
    chats: false,
  });

  useEffect(() => {
    if (!isDeveloperMode) return;

    const interval = setInterval(() => {
      setDebugInfo(DebugManager.getDebugInfo());
      setLogs(DebugManager.getLogs(20));
    }, 1000);

    return () => clearInterval(interval);
  }, [isDeveloperMode]);

  if (!isDeveloperMode) return null;

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 bg-fox-darkgray border-2 border-fox-orange rounded-lg shadow-xl overflow-hidden z-40 flex flex-col">
      {/* Header */}
      <div className="bg-fox-orange px-4 py-2 flex items-center justify-between">
        <h3 className="font-bold text-fox-black text-sm">⚙️ Developer Panel</h3>
        <span className="text-xs bg-fox-black text-fox-orange px-2 py-1 rounded">
          DEV MODE
        </span>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1">
        {/* Debug Info Section */}
        <div className="border-b border-fox-gray-800">
          <button
            onClick={() => toggleSection('debug')}
            className="w-full px-4 py-2 bg-fox-gray-800 hover:bg-fox-gray-700 text-left text-white text-sm font-semibold transition-colors flex justify-between items-center"
          >
            Debug Info
            <span className="text-xs">{expandedSections.debug ? '▼' : '▶'}</span>
          </button>
          {expandedSections.debug && debugInfo && (
            <div className="px-4 py-2 space-y-1 text-xs text-fox-gray-400">
              <p>
                <span className="text-fox-orange">WS Connected:</span>{' '}
                {debugInfo.wsConnected ? '✅' : '❌'}
              </p>
              <p>
                <span className="text-fox-orange">RTC Connections:</span> {debugInfo.rtcConnections}
              </p>
              <p>
                <span className="text-fox-orange">Messages Queued:</span> {debugInfo.messagesQueued}
              </p>
              <p>
                <span className="text-fox-orange">Timestamp:</span>{' '}
                {debugInfo.timestamp.toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>

        {/* Logs Section */}
        <div className="border-b border-fox-gray-800">
          <button
            onClick={() => toggleSection('logs')}
            className="w-full px-4 py-2 bg-fox-gray-800 hover:bg-fox-gray-700 text-left text-white text-sm font-semibold transition-colors flex justify-between items-center"
          >
            Logs ({logs.length})
            <span className="text-xs">{expandedSections.logs ? '▼' : '▶'}</span>
          </button>
          {expandedSections.logs && (
            <div className="px-4 py-2 space-y-1 text-xs font-mono max-h-48 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-fox-gray-500">No logs yet</p>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2 hover:bg-fox-gray-800 p-1 rounded group cursor-pointer">
                    <span
                      className={`flex-shrink-0 ${
                        log.level === 'ERROR'
                          ? 'text-red-500'
                          : log.level === 'WARN'
                          ? 'text-yellow-500'
                          : 'text-fox-orange'
                      }`}
                    >
                      [{log.level}]
                    </span>
                    <span className="text-white truncate flex-1">{log.message}</span>
                    <button
                      onClick={() => handleCopy(log.message, idx)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                      {copiedIndex === idx ? (
                        <Check size={12} className="text-fox-orange" />
                      ) : (
                        <Copy size={12} className="text-fox-gray-500" />
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Chats Section */}
        <div>
          <button
            onClick={() => toggleSection('chats')}
            className="w-full px-4 py-2 bg-fox-gray-800 hover:bg-fox-gray-700 text-left text-white text-sm font-semibold transition-colors flex justify-between items-center"
          >
            Chats ({chats.length})
            <span className="text-xs">{expandedSections.chats ? '▼' : '▶'}</span>
          </button>
          {expandedSections.chats && (
            <div className="px-4 py-2 space-y-2 text-xs text-fox-gray-400 max-h-40 overflow-y-auto">
              {chats.length === 0 ? (
                <p className="text-fox-gray-500">No chats</p>
              ) : (
                chats.map((chat) => (
                  <div key={chat.id} className="bg-fox-gray-800 p-2 rounded">
                    <p className="text-white font-semibold">
                      {chat.participants.map((p) => p.username).join(', ')}
                    </p>
                    <p>Messages: {chat.messages.length}</p>
                    <p>Unread: {chat.unread}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-fox-gray-800 px-4 py-2 text-center text-xs text-fox-gray-500 border-t border-fox-gray-700">
        Running on Vercel • Fox Messenger v0.1.0
      </div>
    </div>
  );
}
