'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

// Define the shape of the context value
interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  // login: (token: string) => void;
  logout: () => void;
  userDetails: {}
}

// Create the context with a default value
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  accessToken: null,
  // login: () => {},
  logout: () => {},
  userDetails: {}
});

// Define the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>((typeof window !== undefined) ? localStorage.getItem('accessToken') : null);
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  console.log('AuthProvider entered');
  // debugger;

  useEffect(() => {
    // debugger;
    const token = localStorage.getItem('accessToken');
    console.log('auth context useEffect entered.')
    if (token) {
      setAccessToken(token);
      setUserDetails(jwtDecode(token));
      setIsAuthenticated(true);
      // alert("you're already logged in");
      // router.push('/journal');
    } else {
      alert("you're not logged in");
      router.push('/login');
    }
  }, []);

  // const login = (token: string) => {
  //   debugger;
  //   localStorage.setItem('accessToken', token);
  //   setAccessToken(token);
  //   setIsAuthenticated(true)
  //   router.push('/journal');  // Redirect to the home page or any other page
  // }; this will not work because I have moved the provider and 
  // the login page is no longer provided this context

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');  
    }
    setAccessToken(null);
    router.push('/login');  // Redirect to the login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, logout, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);