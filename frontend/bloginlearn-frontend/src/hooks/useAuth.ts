'use client';
import { BACKEND_URL, ENDPOINTS } from '@/lib/utils';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  userDetails: object | null;
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
    userDetails: null
  });

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios.get(BACKEND_URL+ENDPOINTS.userDetail, {withCredentials: true})
      .then(res => {
        console.log("logging response from userDetail", res);
      })

      setAuthState({ isLoggedIn: true, accessToken: token, userDetails:null });
    } else {
      //should try to refresh the token first
      setAuthState({ isLoggedIn: false, accessToken: null, userDetails:null})
    }
     
  }, []);

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAuthState({ isLoggedIn: true, accessToken: token, userDetails:null });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({ isLoggedIn: false, accessToken: null, userDetails:null });
  };

  return { ...authState, login, logout };
}