import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ContainerDetail from './ContainerDetail';
import { DropdownMenuDemo } from './ContainerDropdown';
import EntryList from './EntryList';
import axios from 'axios';
import { BACKEND_URL, ENDPOINTS } from '@/lib/utils';
import { useAuthContext } from '@/app/context/useAuthContext';

//this component should fetch all the component details, along with the entries, and give it to it's children.


export default function LeftPanel() {  

  return (
    <div className='flex flex-col h-screen'>
        
      <ContainerDetail />      
      <EntryList />
        
    </div>
  )
}