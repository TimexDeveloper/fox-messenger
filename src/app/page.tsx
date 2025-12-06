'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to chats page on load
    router.replace('/chats');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-fox-darkgray">
      <div className="text-center">
        <div className="text-6xl mb-4">🦊</div>
        <h1 className="text-3xl font-bold text-white mb-2">Fox Messenger</h1>
        <p className="text-fox-gray-500">Loading...</p>
      </div>
    </div>
  );
}
