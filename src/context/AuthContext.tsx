import React, { createContext, useContext } from 'react';

interface AuthContextType {
  currentUser: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock authentication context with a dummy user
  const currentUser = { uid: '1', email: 'user@example.com' };
  const loading = false;

  // Mock authentication methods
  const login = async () => {};
  const register = async () => {};
  const logout = async () => {};
  const loginWithGoogle = async () => {};


  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
