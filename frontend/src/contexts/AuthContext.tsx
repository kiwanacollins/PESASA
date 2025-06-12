import React, { createContext, useEffect, useState } from 'react';
import { authService, type User, type Industry } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  industries: Industry[];
  industriesLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    password: string;
    name?: string;
    gender?: 'male' | 'female' | 'other';
    location?: string;
    industry?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const profileData = await authService.getProfile();
          setUser(profileData.user);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    // Load industries
    const loadIndustries = async () => {
      setIndustriesLoading(true);
      try {
        const industriesData = await authService.getIndustries();
        setIndustries(industriesData);
      } catch (error) {
        console.error('Failed to load industries:', error);
      } finally {
        setIndustriesLoading(false);
      }
    };

    initAuth();
    loadIndustries();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
  };

  const register = async (data: {
    email: string;
    username: string;
    password: string;
    name?: string;
    gender?: 'male' | 'female' | 'other';
    location?: string;
    industry?: string;
  }) => {
    const response = await authService.register(data);
    setUser(response.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    industries,
    industriesLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
