import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const MOCK_USER: User = {
  id: 'mock-user-id',
  email: 'user@example.com',
  full_name: 'Test User',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User | null>(MOCK_USER); // Always return mock user
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // Mock auth functions that immediately succeed
  const handleSignIn = async () => {
    // No-op in development
  };

  const handleSignUp = async () => {
    // No-op in development
  };

  const handleSignOut = async () => {
    // No-op in development
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut
      }}
    >
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