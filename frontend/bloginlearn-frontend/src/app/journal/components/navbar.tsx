"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"


export default function JournalNavbar() {
  return (

    <div className="flex w-full justify-end px-3 items-center">

      <Button className="p-2 m-2 hover:shadow-sm" variant={"outline"}>Create New Note</Button>
      <Button className="p-2 m-2 hover:shadow-sm" variant={"outline"}>Account</Button>
      <Button className="p-2 m-2 hover:shadow-sm">Logout</Button>

    </div>
  )
}

