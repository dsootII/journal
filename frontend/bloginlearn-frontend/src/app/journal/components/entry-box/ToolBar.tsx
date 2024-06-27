import { useJournalContext } from "@/app/context/JournalContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export default function ToolBar() {

  //for now turning this into an entry for title. 
  const {currentThoughtTitle} = useJournalContext();

  return (
    <div className="flex justify-between pt-2 pb-1 bg-stone-300">

      <Input 
        className="font-bold"
        placeholder="You can give a title if you want.."
        value={currentThoughtTitle}
      />

    </div>
  
  )
}