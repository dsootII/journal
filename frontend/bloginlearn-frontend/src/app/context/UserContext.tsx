'use client';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { BACKEND_URL, ENDPOINTS } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/CustomAxios';
import createAxiosInstance from '@/lib/CustomAxios';

//define types
interface UserContextValues {
  userDetails: {
    user: {
      id: number,
      username: string,
      email: string
    },
    containers: Containers
  },
  setContainersUpdated: Dispatch<SetStateAction<boolean>>
}

interface StateValues {
  user: {
    id: number,
    username: string,
    email: string
  },
  containers: Containers
}

const defaultValue: UserContextValues = {
  userDetails: {
    user: {
      id: 0,
      username: "testun",
      email: "testEmail"
    },
    containers: []
  }, 
  setContainersUpdated: () => { }
}

const defaultState: StateValues = {
  user: {
    id: -1,
    username: "testuewrn",
    email: "testEmewrwerail"
  },
  containers: []
}


//create context
const userContext = createContext<UserContextValues>(defaultValue);

//create and export provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, accessToken } = useAuthContext();
  
  const [userDetails, setUserDetails] = useState<StateValues>(defaultState);
  const router = useRouter();
  const [containersUpdated, setContainersUpdated] = useState(false);

  //get user details from backend
  useEffect(() => {
    const axiosInstance = createAxiosInstance();
    axiosInstance.get(ENDPOINTS.userDetail)
    .then(res => {
      if (res.data) {
        setUserDetails(res.data);
      }
      else {
        alert("failed to retreive user info");
      }
    })
    .catch(err => {
      console.log(err)
    });
    
    return () => setContainersUpdated(false)
  }, [containersUpdated])

  return (
    <userContext.Provider value={{userDetails, setContainersUpdated}}>
      {children}
    </userContext.Provider>
  )
}

//export hook
export const useUserContext = () => useContext(userContext);