'use client';
import React, { useContext, useEffect, useState } from 'react'
import { UserProvider, useUserContext } from '../context/UserContext'
import { Button, Card, Flex, Table, Text } from '@radix-ui/themes';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Dialog from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { stat } from 'fs';
import axios from 'axios';
import { BACKEND_URL, ENDPOINTS } from '@/lib/utils';
import { useAuthContext } from '../context/useAuthContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  
  return (
    <UserProvider>
      <AccountPage />   
    </UserProvider>
  ) 
}

function Modal({ isModalOn, handleModalOpening, newContainerName, setNewContainerName }: any) {
  
  enum statusType { not_submitted, is_submitting, successful, failed };
  const userDetails = useUserContext();
  const {accessToken} = useAuthContext();
  console.log("User details in Modal", userDetails);
 
  //status will be 'not submitted'||'is submitting'||'successful'||'failed'
  const [status, setStatus] = useState<statusType>(statusType.not_submitted);

  useEffect( () => {
    if (status === statusType.is_submitting) {
      //ready data to send to server
      const data = {
        name: newContainerName,
        user: userDetails.user.id
      }
      //make request
      axios.post(
        BACKEND_URL+ENDPOINTS.createContainers,
        data,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        }
      ).then(res => {
        console.log(res.data);
      })
    }

  }, [status])



  return (
    <Dialog.Root open={isModalOn} onOpenChange={handleModalOpening}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className='flex justify-between'> 
              <Dialog.Title className="text-xl font-semibold mb-4">Add Container</Dialog.Title>
              <Dialog.Close asChild>
                <Button 
                  variant="ghost" 
                  className="hover:bg-gray-700 hover:text-white text-black p-2 rounded hover:shadow-md"
                >
                  Close
                </Button>
              </Dialog.Close>
            </div>
            
            <Dialog.Description className="mb-4">
              Enter a name for your container.
            </Dialog.Description>
            <Label className="block mb-2">Name:</Label>
            <Input 
              className="w-full mb-4 p-2 border rounded" 
              value={newContainerName} 
              placeholder='container name...'
              onChange={(e) => setNewContainerName(e.target.value)} 
            />
            <div className="flex justify-end">
            <Dialog.Close asChild>
              <Button 
                variant="ghost" 
                className="bg-green-700 text-white p-2 rounded hover:shadow-md"
                onClick={ () => setStatus(statusType.is_submitting) }
              >
                Save
              </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function AccountPage () {

  const userDetails = useUserContext();
  console.log("user details acc page", userDetails);
  const {user, containers} = userDetails;
  const [newContainerName, setNewContainerName] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  const router = useRouter();
  const [selectedContainer, setSelectedContainer] = useState(-1);
  const [deleteSelectedContainer, toggleDeleteSelectedContainer] = useState(false);

  useEffect(() => {
    if (deleteSelectedContainer) {
      alert(`deleting container no. ${selectedContainer} permanently`);
      axios
    }
  }, [])


  function handleModalOpening(isOpen: boolean) {
    setIsModalOn(isOpen);
  }

  return (
    <Flex gap={"3"} direction={'column'}>
      <Card>
        {
          Object.entries(user).map(
            entry => (
              <div><Text><strong>{entry[0]}</strong>: {entry[1]}</Text></div>
            )
          )
        }
      </Card>
      <Card>
      <Button onClick={() => setIsModalOn(true)}>+ Add Container</Button>
      <Button color='ruby' className='ml-2' onClick={() => toggleDeleteSelectedContainer(true)}>Delete Selected Container</Button>
      <Button color='amber' className='ml-2' onClick={() => router.push('/journal')}>Go back to Journal</Button>
      <Modal 
        isModalOn={isModalOn} 
        handleModalOpening={handleModalOpening}
        newContainerName={newContainerName}
        setNewContainerName={setNewContainerName} 
      />
        <Tabs.Root>
          <Tabs.List>
            {
              containers.map(container => (
                <Tabs.Trigger 
                  key={container.id} 
                  value={container.name}
                  className="px-2 py-1 rounded-lg mt-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-300 hover:text-white text-gray-500"
                  onClick={() => setSelectedContainer(container.id)}
                >
                  {container.name}{' '}({container.entries.length})
                </Tabs.Trigger>
              ))
            }
          </Tabs.List>
          {
            containers.map(container => (
              <Tabs.Content key={container.id} value={container.name}>
                <ScrollArea.Root>
                  <ScrollArea.Viewport
                    className='border border-gray-600 mt-1 rounded-2xl'
                  >
                    {
                      container.entries.map(entry => (
                        <div 
                          className=' flex justify-start h-10 items-center border border-gray-200 hover:shadow-md hover:font-bold'>
                          <TrashIcon />
                          <Text className='px-2'>{entry.title}</Text>
                        </div>
                      ))
                    }
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar orientation="horizontal">
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner />
                </ScrollArea.Root>
                
              </Tabs.Content>
            ))
          }
          

        </Tabs.Root>
      </Card>
      
    </Flex>
  )
}

function TrashIcon() {
  return (
    <div className='hover:text-red-800 hover:shadow-red-800 hover:shadow-sm rounded-full hover:bg-red-400 p-2'>
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" data-darkreader-inline-fill=""></path>
    </svg>
    </div>
  )
}
