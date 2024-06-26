"use client";
import { useEffect, useState } from "react";
import Entry from "./components/entry-box/Entry";
import LeftPanel from "./components/left-panel/LeftPanel";
import JournalNavbar from "./components/navbar";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useAuthContext } from "../context/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BACKEND_URL, ENDPOINTS } from "@/lib/utils";
import { JournalProvider, useJournalContext } from '../context/JournalContext';


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

export default function Page() {

  return(
    <JournalProvider>
      <JournalPage />
    </JournalProvider>
  )
}




function JournalPage() {
  const { loading } = useJournalContext();
  
  return (

    <div className="flex w-screen h-screen bg-stone-100">
      {
        loading ?
        <div>Loading, please wait...</div> :
        <>
          <div className="w-1/3">
            <LeftPanel />
          </div>

          <div className="w-2/3 flex flex-col">
            <div>
              <JournalNavbar />
            </div>
            
            <Entry/>

          </div>
        </>
      }
    </div>
  )
}