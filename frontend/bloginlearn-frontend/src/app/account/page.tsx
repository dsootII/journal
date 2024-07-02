'use client';
import React, { useContext, useState } from 'react'
import { UserProvider, useUserContext } from '../context/UserContext'
import { Button, Card, Flex, Table, Text } from '@radix-ui/themes';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Dialog from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';

export default function Page() {
  
  return (
    <UserProvider>
      <AccountPage />   
    </UserProvider>
  ) 
}

function Modal () {

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>+ Add Container</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay forceMount/>
        <Dialog.Content>
          <Dialog.Title>Add Container</Dialog.Title>
          <Dialog.Description>
            Enter a name for your container.
          </Dialog.Description>
          <Label>Name:</Label>
          <Input placeholder='container name...'/>
          <Dialog.Close asChild>
            <Button>Save</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function AccountPage () {

  const userDetails = useUserContext();
  console.log("user details acc page", userDetails);
  const {user, containers} = userDetails;
  const [newContainerName, setNewContainerName] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);


  function handleAddContainer () {
    setIsModalOn(!isModalOn);
  }

  return (
    <Flex gap={"3"}>
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
        <Modal />
        <Tabs.Root>
          <Tabs.List>
            {
              containers.map(container => (
                <Tabs.Trigger value={container.name}>
                  {container.name}{' '}({container.entries.length})
                </Tabs.Trigger>
              ))
            }
          </Tabs.List>
          {
            containers.map(container => (
              <Tabs.Content value={container.name}>
                <ScrollArea.Root>
                  <ScrollArea.Viewport>
                    {
                      container.entries.map(entry => (
                        <div><Text>{entry.title}</Text></div>
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