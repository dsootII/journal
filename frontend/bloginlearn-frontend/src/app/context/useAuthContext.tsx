'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

// Define the shape of the context value
interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  userDetails: {}
}

// Create the context with a default value
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  accessToken: null,
  login: () => {},
  logout: () => {},
  userDetails: {}
});

// Define the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  console.log('AuthProvider entered');
  // debugger;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('auth context useEffect entered.')
    if (token) {
      setAccessToken(token);
      setUserDetails(jwtDecode(token));
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    router.push('/journal');  // Redirect to the home page or any other page
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    router.push('/login');  // Redirect to the login page
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);