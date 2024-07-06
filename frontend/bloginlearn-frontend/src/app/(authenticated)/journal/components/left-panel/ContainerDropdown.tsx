import { useAuthContext } from "@/app/context/useAuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BACKEND_URL, ENDPOINTS } from "@/lib/utils"
import axios from "axios"
import { error } from "console"
import { title } from "process"
import React, { useEffect, useState } from "react"
import { ReactNode } from "react"
import { SetStateAction } from "react";
import { Dispatch } from "react";


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

export const DropdownMenuDemo: React.FC<{ 
  containerList: Containers,
  setSelectedContainer: Dispatch<SetStateAction<number>>, 
  children: ReactNode 
}> = ({containerList, setSelectedContainer, children}) => {
  //receive containerList from LeftPanel. thoda propdrilling chalega. 
  //no useEffect required here. That's stupid. 



  const menuItems:any = [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-stone-100 shadow-lg">{children}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">

        {
          containerList.map((container, index) => {
            return( 
            <DropdownMenuGroup key={container.name}>
              <DropdownMenuItem onClick={() => setSelectedContainer(index)}>
                {container.name}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )})
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
