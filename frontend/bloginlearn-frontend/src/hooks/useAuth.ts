'use client';
import { useState, useEffect } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
}

interface AuthActions {
  login: (token: string) => void;
  logout: () => void;
}

type AuthHook = AuthState & AuthActions;

export default function useAuth(): AuthHook {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    accessToken: null,
  });

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAuthState({ isLoggedIn: true, accessToken: token });
    } else {
      //should try to refresh the token first
      setAuthState({ isLoggedIn: false, accessToken: null})
    }
     
  }, []);

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAuthState({ isLoggedIn: true, accessToken: token });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({ isLoggedIn: false, accessToken: null });
  };

  return { ...authState, login, logout };
}