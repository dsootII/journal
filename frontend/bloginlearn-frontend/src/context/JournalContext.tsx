'use client';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BACKEND_URL, ENDPOINTS } from '@/lib/utils';
import axiosInstance from '@/lib/CustomAxios';
import createAxiosInstance from '@/lib/CustomAxios';
import Entry from '../app/(authenticated)/journal/components/entry-box/Entry';

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
  setListUpdated: Dispatch<SetStateAction<boolean>>;
  selectedEntry: Entry;
  setSelectedEntry: Dispatch<SetStateAction<Entry>>
}

const defaultContainerValue: Container = {
  id: 0,
  name: "Default Container",
  entries: []
}

const defaultEntry = {
  id: 0,
  title: '',
  body: '',
  created_at: '',
  updated_at: '',
  user: 0,
  container: 0,
};


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
  setListUpdated: () => {},
  selectedEntry: defaultEntry,
  setSelectedEntry: () => {}
});

//create JournalContext component, which will return the provider component,
//with children wrapped inside

export const JournalProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [containerList, setContainerList] = useState<Containers>([defaultContainerValue]);
  const [selectedContainer, setSelectedContainer] = useState(0);
  // const { isAuthenticated, accessToken } = useAuthContext();
  const [currentThought, setCurrentThought] = useState('');
  const [currentThoughtTitle, setCurrentThoughtTitle] = useState('');
  const [listUpdated, setListUpdated] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry>(containerList[0].entries[0]);

  useEffect(() => {
    // debugger;
    const axiosInstance = createAxiosInstance();
    axiosInstance.get(ENDPOINTS.listContainers)
      .then(res => {
        // console.log("logging axios response in leftPanel useEffect", res);
        if (res.data) {
          setContainerList(res.data);
          setLoading(false);

        }
      })
      .catch(error => {
        console.log(error);
      })
    if (typeof window !== 'undefined') {
      let possible_container = localStorage.getItem("selectedContainer")
      if (possible_container) {
        setSelectedContainer(parseInt(possible_container))
      } else {
        localStorage.setItem("selectedContainer", selectedContainer.toString());
      }
    }
    

    return () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("selectedContainer");
      }
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
        setListUpdated,
        selectedEntry,
        setSelectedEntry
      }}
    >
      {children}
    </JournalContext.Provider>
  )
}

//make an anonymous function that uses this context

export const useJournalContext = () => useContext(JournalContext);