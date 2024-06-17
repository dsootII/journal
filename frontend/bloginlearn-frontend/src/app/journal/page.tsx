"use client";
import { useEffect, useState } from "react";
import Entry from "./components/entry-box/Entry";
import LeftPanel from "./components/left-panel/LeftPanel";
import JournalNavbar from "./components/navbar";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useAuthContext } from "../context/useAuthContext";
import { jwtDecode } from "jwt-decode";



export default function JournalPage() {

  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});

  const { isAuthenticated, accessToken } = useAuthContext();
  useEffect( () => {
    if (!isAuthenticated) {
      alert("You're not logged in");
      router.push('/login');
    } else {
      if(accessToken) {
        const userDetailsDecoded = jwtDecode(accessToken);
        setUserDetails(userDetailsDecoded);
      } else {
        console.log("how did it come to this");
        debugger;
      }
      
    }
  }, []);

  return (
    <div className="flex w-screen h-screen bg-stone-100">

      <div className="w-1/3">
        <LeftPanel userDetails={userDetails}/>
      </div>

      <div className="w-2/3 flex flex-col">
        <div>
          <JournalNavbar />
        </div>
        
        <Entry/>

      </div>



    </div>
  )
}