import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


export default function ToolBar() {

  return (
    <div className="flex justify-between p-2 bg-stone-300">
      <div>
        <Button variant={"outline"} className="px-2 mx-1 "><strong>B</strong></Button>
        <Button variant={"outline"} className="px-2 mx-1 ">U</Button>
        <Button variant={"outline"} className="px-2 mx-1 "><em>I</em></Button>
      </div>


        
    </div>
  
  )
}