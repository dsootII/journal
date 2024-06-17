import { useEffect, useState } from 'react';
import ContainerDetail from './ContainerDetail';
import { DropdownMenuDemo } from './ContainerDropdown';
import EntryList from './EntryList';
import axios from 'axios';
import { BACKEND_URL, ENDPOINTS } from '@/lib/utils';
import { useAuthContext } from '@/app/context/useAuthContext';

//this component should fetch all the component details, along with the entries, and give it to it's children.

interface Entry {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  user: number;
  container: number;
}

// Define the type for the main container which includes a name and entries
interface Container {
  name: string;
  entries: Entry[];
}

// Define the type for the array of containers
type Containers = Container[];



export default function LeftPanel({userDetails}: any) {

  const username = userDetails.username;
  const {accessToken} = useAuthContext();
  const [containerList, setContainerList] = useState<Containers>([]);
  const [selectedContainer, setSelectedContainer] = useState(0);


  useEffect(() => {
    axios.get(
      BACKEND_URL+ENDPOINTS.listContainers, 
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
    .then(res => {
      console.log(res);
      setContainerList(res.data);;
    })
    .catch(error => {
      console.log(error);
    }) 
  }, []);

  

  return (
    <div className='flex flex-col h-screen'>
      
      <ContainerDetail selectedContainer={containerList[selectedContainer]} />      
      <EntryList setSelectedContainer={setSelectedContainer} selectedContainer={containerList[selectedContainer]}/>

    </div>
  )
}