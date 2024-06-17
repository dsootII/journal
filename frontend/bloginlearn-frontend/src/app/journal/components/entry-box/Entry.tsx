import { Button } from "@/components/ui/button";
import InputBox from "./InputBox";
import ToolBar from "./ToolBar";



export default function Entry () {

  return (
    <div className="border border-stone-200 rounded-md flex-grow">
      <ToolBar/>
      <InputBox />
      <div className="flex justify-end py-2">
        <Button className="px-2 mx-1  hover:bg-green-700">Conclude</Button>
        <Button className="px-2 mx-1 hover:bg-red-700">Perish</Button>
      </div>
    </div>
  )
}