import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '@/types';

interface AuthContextValue extends AuthState {
  login: (email: string, password: string, userType: 'user' | 'pharmacy') => Promise<void>;
  register: (name: string, email: string, password: string, userType: 'user' | 'pharmacy') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    userType: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token/session
    const savedUser = localStorage.getItem('user');
    const savedUserType = localStorage.getItem('userType');
    
    if (savedUser && savedUserType) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        userType: savedUserType as 'user' | 'pharmacy',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'user' | 'pharmacy') => {
    try {
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: '1',
        name: userType === 'user' ? 'Sarah Johnson' : 'Green Pharmacy',
        email,
        role: userType === 'user' ? 'student' : 'pharmacy',
        createdAt: new Date().toISOString(),
      };

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        userType,
      });

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('userType', userType);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, userType: 'user' | 'pharmacy') => {
    try {
      // Mock registration - replace with actual API call
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: userType === 'user' ? 'student' : 'pharmacy',
        createdAt: new Date().toISOString(),
      };

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        userType,
      });

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('userType', userType);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      userType: null,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};