"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/app/context/useAuthContext"
import { useRouter } from "next/navigation"


export default function JournalNavbar() {
  const router = useRouter();
  const {logout} = useAuthContext(); 
  
  function handleLogout() {
    logout();
    if (localStorage.getItem('refreshToken')) {
      localStorage.removeItem('refreshToken');
    }
    router.push('/');
  }
  
  return (
    <div className="flex w-full justify-end px-3 items-center bg-stone-400">

      <Button className="p-2 m-2 hover:shadow-sm" variant={"outline"}>Create New Note</Button>
      <Button className="p-2 m-2 hover:shadow-sm" variant={"outline"}>Account</Button>
      <Button className="p-2 m-2 hover:shadow-sm" onClick={handleLogout}>Logout</Button>

    </div>
  )
}

