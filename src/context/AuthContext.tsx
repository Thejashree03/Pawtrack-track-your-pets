
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Login credentials are:
// Admin: username: "admin", password: "admin123"
// Regular user: username: "user", password: "user123"

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  logout: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing token and user data on mount
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('accessToken');
      
      if (storedUser && token) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Redirect based on role if on login page
          if (window.location.pathname === '/' || window.location.pathname === '/login') {
            if (userData.role === 'ROLE_ADMIN') {
              navigate('/admin/dashboard');
            } else {
              navigate('/home');
            }
          }
        } catch (error) {
          console.error('Failed to parse user data', error);
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate JWT auth
      let mockUser: User;
      let token: string;
      
      if (username === 'admin' && password === 'admin123') {
        // Admin login
        mockUser = {
          id: '1',
          username: 'admin',
          role: 'ROLE_ADMIN',
          firstName: 'Admin',
          lastName: 'User'
        };
        token = 'mock-admin-jwt-token';
      } else if (username === 'user' && password === 'user123') {
        // Regular user login
        mockUser = {
          id: '2',
          username: 'user',
          role: 'ROLE_CUSTOMER',
          firstName: 'User',
          lastName: ''
        };
        token = 'mock-user-jwt-token';
      } else {
        throw new Error('Invalid credentials. Try admin/admin123 or user/user123');
      }
      
      // Store user and token
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', 'mock-refresh-token');
      
      setUser(mockUser);
      toast.success('Login successful!');
      
      // Redirect based on role
      if (mockUser.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      toast.error('Login failed: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    toast.info('You have been logged out');
    navigate('/login');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
