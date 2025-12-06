'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { isFirebaseConfigured, auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { LogIn, UserPlus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AuthPage() {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthStore();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123456');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const demoUser = {
        id: 'demo-user-' + Math.random().toString(36).substr(2, 9),
        email: 'demo@example.com',
        username: 'Demo Fox',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo-fox',
        isOnline: true,
      };

      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('fox_auth_user', JSON.stringify(demoUser));
      router.push('/chats');
    } catch (err: any) {
      setError('Ошибка демо входа');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isFirebaseConfigured) {
        // Demo mode - simulate login
        const demoUser = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          username: username || email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          isOnline: true,
        };

        setUser(demoUser);
        setIsAuthenticated(true);
        localStorage.setItem('fox_auth_user', JSON.stringify(demoUser));
      } else {
        // Real Firebase authentication
        await signInWithEmailAndPassword(auth, email, password);
        
        // Get user data
        const user = {
          id: auth.currentUser!.uid,
          email: auth.currentUser!.email || email,
          username: username || email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          isOnline: true,
        };

        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('fox_auth_user', JSON.stringify(user));
      }

      router.push('/chats');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isFirebaseConfigured) {
        // Demo mode - simulate signup
        const newUser = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          username: username || email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          isOnline: true,
        };

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('fox_auth_user', JSON.stringify(newUser));
      } else {
        // Real Firebase authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        const user = {
          id: userCredential.user.uid,
          email: userCredential.user.email || email,
          username: username || email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          isOnline: true,
        };

        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('fox_auth_user', JSON.stringify(user));
      }

      router.push('/chats');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fox-black to-fox-darkgray flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🦊</div>
          <h1 className="text-4xl font-bold text-white mb-2">Fox Messenger</h1>
          <p className="text-fox-gray-500">Современный мессенджер</p>
          {!isFirebaseConfigured && (
            <p className="text-xs text-fox-orange mt-2">⚡ Демо режим (без Firebase)</p>
          )}
        </div>

        {/* Form */}
        <div className="bg-fox-gray-800 rounded-lg p-8 border border-fox-gray-700">
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm text-fox-gray-400 mb-2">Имя пользователя</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  className="w-full bg-fox-black text-white px-4 py-2 rounded border border-fox-gray-700 focus:outline-none focus:border-fox-orange placeholder-fox-gray-600"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-fox-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-fox-black text-white px-4 py-2 rounded border border-fox-gray-700 focus:outline-none focus:border-fox-orange placeholder-fox-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm text-fox-gray-400 mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-fox-black text-white px-4 py-2 rounded border border-fox-gray-700 focus:outline-none focus:border-fox-orange placeholder-fox-gray-600"
              />
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-fox-orange hover:brightness-110 disabled:opacity-50 text-fox-black font-semibold py-2 rounded transition-all flex items-center justify-center gap-2"
            >
              {isSignUp ? (
                <>
                  <UserPlus size={18} /> Создать аккаунт
                </>
              ) : (
                <>
                  <LogIn size={18} /> Войти
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setEmail('demo@example.com');
                setPassword('demo123456');
                setUsername('');
              }}
              className="text-fox-orange hover:underline text-sm"
            >
              {isSignUp ? 'Уже есть аккаунт? Войти' : 'Создать новый аккаунт'}
            </button>
          </div>

          {/* Demo Button */}
          <div className="mt-6 pt-6 border-t border-fox-gray-700">
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full bg-fox-gray-700 hover:bg-fox-gray-600 disabled:opacity-50 text-white font-semibold py-2 rounded transition-all text-sm"
            >
              🚀 Пробный вход (Demo)
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-fox-gray-800 rounded-lg p-4 border border-fox-gray-700 text-center">
          {isFirebaseConfigured ? (
            <>
              <p className="text-xs text-fox-gray-400 mb-2">🔥 Firebase активен</p>
              <p className="text-xs text-fox-gray-500">Ваши данные сохраняются</p>
            </>
          ) : (
            <>
              <p className="text-xs text-fox-gray-400 mb-2">📝 Демо данные:</p>
              <p className="text-xs text-fox-gray-500">Любой email/пароль будет работать</p>
              <p className="text-xs text-fox-orange mt-2">⚡ Данные не сохраняются</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

