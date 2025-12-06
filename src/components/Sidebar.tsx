'use client';

import { useAppStore } from '@/store/useAppStore';
import { LogOut, Settings, MessageCircle, Users, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Chats', href: '/chats', icon: MessageCircle },
  { name: 'Friends', href: '/friends', icon: Users },
  { name: 'Calls', href: '/calls', icon: Phone },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const currentUser = useAppStore((s) => s.currentUser);
  const isDeveloperMode = useAppStore((s) => s.isDeveloperMode);
  const toggleDeveloperMode = useAppStore((s) => s.toggleDeveloperMode);

  return (
    <div className="h-screen w-64 bg-fox-black border-r border-fox-gray-800 flex flex-col">
      {/* Logo & Branding */}
      <div className="p-6 border-b border-fox-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-fox-orange rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-fox-black">🦊</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Fox</h1>
            <p className="text-xs text-fox-gray-500">Messenger</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      {currentUser && (
        <div className="px-4 py-4 border-b border-fox-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg'}
                alt={currentUser.username}
                className="w-10 h-10 rounded-full object-cover border-2 border-fox-orange"
              />
              {currentUser.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-fox-orange rounded-full border border-fox-black"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{currentUser.username}</p>
              <p className="text-xs text-fox-gray-500">
                {currentUser.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname?.startsWith(item.href) || pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-fox-orange text-fox-black font-medium'
                  : 'text-fox-gray-500 hover:bg-fox-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Developer Mode & Logout */}
      <div className="p-4 border-t border-fox-gray-800 space-y-2">
        <button
          onClick={toggleDeveloperMode}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
            isDeveloperMode
              ? 'bg-fox-orange bg-opacity-20 text-fox-orange'
              : 'text-fox-gray-500 hover:bg-fox-gray-800'
          }`}
        >
          <span className="text-lg">⚙️</span>
          <span>{isDeveloperMode ? 'Dev Mode ON' : 'Dev Mode'}</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-fox-gray-500 hover:bg-fox-gray-800 transition-colors">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
