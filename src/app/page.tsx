'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isFirebaseConfigured, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // Demo mode - check localStorage
      const foxAuthUser = localStorage.getItem('fox_auth_user');
      if (foxAuthUser) {
        router.replace('/chats');
      } else {
        router.replace('/auth');
      }
      setLoading(false);
      return;
    }

    // Firebase mode
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Пользователь авторизован
        router.replace('/chats');
      } else {
        // Пользователь не авторизован
        router.replace('/auth');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-fox-darkgray">
        <div className="text-center">
          <div className="text-6xl mb-4">🦊</div>
          <h1 className="text-3xl font-bold text-white mb-2">Fox Messenger</h1>
          <p className="text-fox-gray-500">Загрузка...</p>
        </div>
      </div>
    );
  }

  return null;
}

