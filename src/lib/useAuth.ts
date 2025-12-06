import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
  const { user, isAuthenticated, setUser, setIsAuthenticated, setIsLoading } = useAuthStore();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check for user in localStorage or auth state
    const foxAuthUser = localStorage.getItem('fox_auth_user');
    
    if (foxAuthUser) {
      try {
        const userData = JSON.parse(foxAuthUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch {
        // Invalid localStorage data
        router.push('/auth');
      }
    } else if (!isAuthenticated) {
      // No user found
      router.push('/auth');
    }

    setIsLoading(false);
    setIsCheckingAuth(false);
  }, []);

  return { user, isAuthenticated, isCheckingAuth };
}
