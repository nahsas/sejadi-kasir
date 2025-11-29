'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: any;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock user object. In a real app, you'd fetch this from your API.
const MOCK_USER = { name: 'Admin', email: 'admin@example.com' };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // In a real app, you'd verify the user's session with your backend
    const session = localStorage.getItem('user-session');
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname !== '/login') {
      router.push('/login');
    }
  }, [user, loading, pathname, router]);

  const login = async (email: string, pass: string) => {
    // !! IMPORTANT !!
    // Replace this with your actual API call to your backend.
    // This is a mock login function.
    if (email === 'admin@example.com' && pass === 'password') {
       localStorage.setItem('user-session', JSON.stringify(MOCK_USER));
       setUser(MOCK_USER);
       return Promise.resolve();
    }
    return Promise.reject('Invalid credentials');
  };

  const logout = () => {
    // Replace this with your actual API call to invalidate the session
    localStorage.removeItem('user-session');
    setUser(null);
    router.push('/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>; // Or a proper loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
