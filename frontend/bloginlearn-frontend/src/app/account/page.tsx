'use client';
import React, { useContext } from 'react'
import { UserProvider, useUserContext } from '../context/UserContext'
import { Card, Flex, Table, Text } from '@radix-ui/themes';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';

export default function Page() {
  
  return (
    <UserProvider>
      <AccountPage />   
    </UserProvider>
  )

  
}

function AccountPage () {

  const userDetails = useUserContext();
  console.log("user details acc page", userDetails);
  const {user, containers} = userDetails;

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