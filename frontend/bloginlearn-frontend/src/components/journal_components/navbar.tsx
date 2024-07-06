"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/useAuthContext"
import { useRouter } from "next/navigation"
import { useJournalContext } from "@/context/JournalContext"


export default function JournalNavbar() {
  const router = useRouter();
  const {logout} = useAuthContext(); 

  const {
    currentThought,
    currentThoughtTitle,
    setCurrentThought,
    setCurrentThoughtTitle
  } = useJournalContext();
  
  function handleLogout() {
    logout();
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('refreshToken')) {
        localStorage.removeItem('refreshToken');
      }
      router.push('/');
    }
    
  }

  function handleNewNoteCreation () {
    if(currentThought.length>0 || currentThoughtTitle.length>0) {
      if (confirm("Perish current thought?")){
        setCurrentThought('');
        setCurrentThoughtTitle('');
      }
    }
  }

  return (
    <div className="flex w-full justify-end px-3 items-center bg-gradient-to-l from-stone-700 to-stone-800">

      <Button 
        className="p-2 m-2 hover:shadow-sm bg-stone-200" 
        variant={"outline"} 
        onClick={handleNewNoteCreation}
      >
        Create New Note
      </Button>
      <Button 
        className="p-2 m-2 hover:shadow-sm bg-stone-200" 
        variant={"outline"}
        onClick={() => router.push('/account')}
      >
        Account
      </Button>
      <Button className="p-2 m-2 hover:shadow-sm" onClick={handleLogout}>Logout</Button>

    </div>
  )
}

