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
import React, { useEffect, useState } from "react"
import { ReactNode } from "react"


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

export const DropdownMenuDemo: React.FC<{ children: ReactNode }> = ({children}) => {
  const {accessToken} = useAuthContext();
  const [containerList, setContainerList] = useState<Containers>([]);

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
      setContainerList(res.data);
    })
    .catch(error => {
      console.log(error);
    }) 
  }, [])

  const menuItems:any = [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">

        {
          containerList.map(container => {
            return( 
            <DropdownMenuGroup>
              <DropdownMenuItem>
                  {container.name}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )})
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
