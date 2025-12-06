'use client';

import { Sidebar } from '@/components/Sidebar';
import { DeveloperPanel } from '@/components/DeveloperPanel';
import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';
import { Bell, Lock, Eye, Volume2, Database } from 'lucide-react';

const MOCK_USER = {
  id: 'user-123',
  username: 'Your Name',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  isOnline: true,
  status: 'Available',
};

export default function SettingsPage() {
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);

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
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl space-y-8">
            {/* Account Section */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>👤</span> Account
              </h2>
              <div className="space-y-4">
                <div className="bg-fox-gray-800 rounded-lg p-4">
                  <label className="block text-sm text-fox-gray-500 mb-2">Username</label>
                  <input
                    type="text"
                    defaultValue={MOCK_USER.username}
                    className="w-full bg-fox-black text-white px-3 py-2 rounded border border-fox-gray-700 focus:outline-none focus:border-fox-orange"
                  />
                </div>
                <div className="bg-fox-gray-800 rounded-lg p-4">
                  <label className="block text-sm text-fox-gray-500 mb-2">Status</label>
                  <select className="w-full bg-fox-black text-white px-3 py-2 rounded border border-fox-gray-700 focus:outline-none focus:border-fox-orange">
                    <option>Available</option>
                    <option>Away</option>
                    <option>Do Not Disturb</option>
                    <option>Invisible</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Privacy Section */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock size={20} /> Privacy
              </h2>
              <div className="space-y-3">
                <div className="bg-fox-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-fox-gray-700 transition-colors cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Private Messages</p>
                    <p className="text-sm text-fox-gray-500">Allow everyone to message you</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer accent-fox-orange" />
                </div>
                <div className="bg-fox-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-fox-gray-700 transition-colors cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Show Online Status</p>
                    <p className="text-sm text-fox-gray-500">Let friends see when you're online</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer accent-fox-orange" />
                </div>
                <div className="bg-fox-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-fox-gray-700 transition-colors cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Read Receipts</p>
                    <p className="text-sm text-fox-gray-500">Show when you've read messages</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer accent-fox-orange" />
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Bell size={20} /> Notifications
              </h2>
              <div className="space-y-3">
                <div className="bg-fox-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-fox-gray-700 transition-colors cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Message Notifications</p>
                    <p className="text-sm text-fox-gray-500">Desktop and browser alerts</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer accent-fox-orange" />
                </div>
                <div className="bg-fox-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-fox-gray-700 transition-colors cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Call Notifications</p>
                    <p className="text-sm text-fox-gray-500">Alert for incoming calls</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer accent-fox-orange" />
                </div>
                <div className="bg-fox-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-fox-gray-700 transition-colors cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Sound</p>
                    <p className="text-sm text-fox-gray-500">Play notification sounds</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer accent-fox-orange" />
                </div>
              </div>
            </section>

            {/* Audio/Video Section */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Volume2 size={20} /> Audio & Video
              </h2>
              <div className="space-y-4">
                <div className="bg-fox-gray-800 rounded-lg p-4">
                  <label className="block text-sm text-fox-gray-500 mb-2">Microphone</label>
                  <select className="w-full bg-fox-black text-white px-3 py-2 rounded border border-fox-gray-700 focus:outline-none focus:border-fox-orange">
                    <option>Default Device</option>
                    <option>Built-in Microphone</option>
                  </select>
                </div>
                <div className="bg-fox-gray-800 rounded-lg p-4">
                  <label className="block text-sm text-fox-gray-500 mb-2">Camera</label>
                  <select className="w-full bg-fox-black text-white px-3 py-2 rounded border border-fox-gray-700 focus:outline-none focus:border-fox-orange">
                    <option>Default Device</option>
                    <option>Built-in Camera</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Developer Mode Section */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>⚙️</span> Developer Options
              </h2>
              <div className="bg-fox-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-fox-gray-700 transition-colors cursor-pointer">
                <div>
                  <p className="text-white font-medium">Developer Mode</p>
                  <p className="text-sm text-fox-gray-500">Access debug tools and logs</p>
                </div>
                <input type="checkbox" className="w-5 h-5 cursor-pointer accent-fox-orange" />
              </div>
            </section>

            {/* Data Section */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Database size={20} /> Data
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-fox-gray-800 hover:bg-fox-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                  Clear Cache
                </button>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                  Delete All Data
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <DeveloperPanel />
    </div>
  );
}
