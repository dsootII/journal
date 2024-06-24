import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuDemo } from "./ContainerDropdown"
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

interface EntryListProps {
  setSelectedContainer: Dispatch<SetStateAction<number>>,
  selectedContainer: Container
  containerList: Containers
}


export default function EntryList ({setSelectedContainer, selectedContainer, containerList}: EntryListProps) {


  //gotta make the UI reactive after this. Actually the auth context itself should have all details ready
  //which can be stored in redux state.
  //yeah, now this is the shit we gotta be doing. 


  //testing with dummy entries for now, direct hardcoding

  return (
    <div className="h-5/6 flex flex-col ">
      <Card className="flex flex-col h-full">
        <CardHeader className="shadow-sm bg-stone-500">
          <CardTitle>
            <div className="flex justify-between px-2 items-center">
              <h3>Entries</h3>
              <DropdownMenuDemo containerList={containerList} setSelectedContainer={setSelectedContainer}>
                Containers  
              </DropdownMenuDemo>    
            </div>
            
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto bg-stone-700 scrollbar scrollbar-thumb-stone-800">
          <div>
            {
              selectedContainer.entries.map((entry) => {
                return (
                  <Card 
                    className = "bg-stone-200 my-2 hover:shadow-lg hover:bg-stone-300" 
                    key={entry.id}
                    
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-hidedn"> {entry.body} </CardContent>
                    <CardFooter className="text-sm font-extralight">Created on {entry.created_at.slice(0,10)}</CardFooter>
                  </Card>
                )
              })
            }            
          </div>
        </CardContent>
      </Card>
    </div>
  )
}