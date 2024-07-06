"use client";
import { useJournalContext } from "@/app/context/JournalContext";
import { Input } from "@/components/ui/input";


export default function ToolBar() {

  //for now turning this into an entry for title. 
  const {currentThoughtTitle, setCurrentThoughtTitle} = useJournalContext();

  return (
    <div className="flex justify-between pt-2 pb-1 bg-stone-600">

      <Input 
        className="font-bold bg-stone-100"
        placeholder="You need to give a title to conclude.."
        value={currentThoughtTitle}
        onChange={(e) => setCurrentThoughtTitle(e.target.value)}
      />

    </div>
  
  )
}