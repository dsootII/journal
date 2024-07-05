'use client';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BACKEND_URL, ENDPOINTS } from '@/lib/utils';
import axiosInstance from '@/lib/CustomAxios';
import createAxiosInstance from '@/lib/CustomAxios';

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
  setListUpdated: Dispatch<SetStateAction<boolean>>
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
  setCurrentThoughtTitle: () => {},
  setListUpdated: () => {}
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
  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
    // debugger;
    // if (!isAuthenticated) {
    //   alert("You're not logged in");
    //   router.push('/login');
    // }
    debugger;
    console.log("accessToken being sent to the backend", accessToken);
    const axiosInstance = createAxiosInstance();
    axiosInstance.get( ENDPOINTS.listContainers)
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
    let possible_container = localStorage.getItem("selectedContainer")
    if (possible_container) {
      setSelectedContainer(parseInt(possible_container))
    } else {
      localStorage.setItem("selectedContainer", selectedContainer.toString());
    }

    return () => {
      localStorage.removeItem("selectedContainer");
      setLoading(true);
      setListUpdated(false);
    }
  }, [listUpdated]);

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
        setCurrentThoughtTitle,
        setListUpdated
      }}
    >
      {children}
    </JournalContext.Provider>
  )
}

//make an anonymous function that uses this context

export const useJournalContext = () => useContext(JournalContext);