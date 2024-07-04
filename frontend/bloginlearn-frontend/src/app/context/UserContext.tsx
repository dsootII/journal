'use client';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { BACKEND_URL, ENDPOINTS } from '@/lib/utils';
import { useRouter } from 'next/navigation';

//define types
interface UserContextValues {
  user: {
    id: number,
    username: string,
    email: string
  },
  containers: Containers
}

const defaultValue: UserContextValues = {
  user: {
    id: 0,
    username: "testun",
    email: "testEmail"
  },
  containers: []
}


//create context
const userContext = createContext<UserContextValues>(defaultValue);

//create and export provider
export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {isAuthenticated, accessToken} = useAuthContext();
  const [userDetails, setUserDetails] = useState(defaultValue);
  const router = useRouter();

  //get user details from backend
  useEffect( () => {
    // debugger;
    // if (!isAuthenticated) {
    //   alert("you ain't authenticated");
    //   router.push("/");
    // }
    axios
    .get(         
      BACKEND_URL+ENDPOINTS.userDetail,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
    })
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

  }, [])

  return (
    <userContext.Provider value={userDetails}>
      {children}
    </userContext.Provider>
  )
}

//export hook
export const useUserContext = () => useContext(userContext);