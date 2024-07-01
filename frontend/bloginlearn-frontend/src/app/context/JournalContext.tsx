'use client';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BACKEND_URL, ENDPOINTS } from '@/lib/utils';

//define the types
interface JournalContextValues {
  loading: boolean;
  containerList: Containers;
  selectedContainer: Container;
  setSelectedContainer: Dispatch<SetStateAction<number>>;
  currentThought: string;
  setCurrentThought: Dispatch<SetStateAction<string>>;
  currentThoughtTitle: string;
  setCurrentThoughtTitle: Dispatch<SetStateAction<string>>;
}

const defaultContainerValue: Container = {
  id: 0,
  name: "Default Container",
  entries: []
}


//create journal context
const JournalContext = createContext<JournalContextValues>({
  loading: true,
  containerList: [],
  selectedContainer: defaultContainerValue,
  setSelectedContainer: () => {},
  currentThought: '',
  setCurrentThought: () => {},
  currentThoughtTitle: '',
  setCurrentThoughtTitle: () => {}
});

//create JournalContext component, which will return the provider component,
//with children wrapped inside

export const JournalProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [containerList, setContainerList] = useState<Containers>([]);
  const [selectedContainer, setSelectedContainer] = useState(0);
  const { isAuthenticated, accessToken } = useAuthContext();
  const [currentThought, setCurrentThought] = useState('');
  const [currentThoughtTitle, setCurrentThoughtTitle] = useState('');

  useEffect( () => {
    if (!isAuthenticated) {
      alert("You're not logged in");
      router.push('/login');
    }
    console.log("accessToken being sent to the backend", accessToken); 
    axios.get(
      BACKEND_URL+ENDPOINTS.listContainers, 
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
    .then(res => {
      console.log("logging axios response in leftPanel useEffect", res);
      if (res.data) {
        setContainerList(res.data);
        setLoading(false);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <JournalContext.Provider 
      value={{
        loading, 
        containerList, 
        selectedContainer: containerList[selectedContainer], 
        setSelectedContainer, 
        currentThought, 
        setCurrentThought,
        currentThoughtTitle,
        setCurrentThoughtTitle
      }}
    >
      {children}
    </JournalContext.Provider>
  )
}

//make an anonymous function that uses this context

export const useJournalContext = () => useContext(JournalContext);