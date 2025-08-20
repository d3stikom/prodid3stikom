'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../lib/supabase';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await db.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userData = await db.signIn(email, password);
      setUser(userData.user);
      
      // Redirect based on role
      switch (userData.role) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'dosen':
          router.push('/dashboard/dosen');
          break;
        case 'mahasiswa':
          router.push('/dashboard/mahasiswa');
          break;
        default:
          router.push('/dashboard');
      }
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await db.signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    checkUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};