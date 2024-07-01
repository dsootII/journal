import { Button } from "@/components/ui/button";
import InputBox from "./InputBox";
import ToolBar from "./ToolBar";
import { useJournalContext } from "@/app/context/JournalContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL, ENDPOINTS } from "@/lib/utils";
import { useRouter } from "next/navigation";


export default function Entry () {
  const router = useRouter();
  const [dbCallData, setDbCallData] = useState({});
  const { 
    currentThought, 
    currentThoughtTitle, 
    setCurrentThought, 
    setCurrentThoughtTitle,
    selectedContainer 
  } = useJournalContext();

  useEffect( () => {
    axios.post(BACKEND_URL+ENDPOINTS.createEntry, dbCallData)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [dbCallData])



  function handleConclude() {
    //how do I make a DB call here? state and hook? let's try
    console.log('container being sent:', selectedContainer);
    const data = {
      title: currentThoughtTitle,
      body: currentThought,
      container: selectedContainer.id
    }
    setDbCallData(data);
    router.refresh();
  }

  function handlePerish() {
    let alertMessage = "Are you sure?"
    if (confirm(alertMessage)) {
      setCurrentThought('');
      setCurrentThoughtTitle('');
    }
  }

  return (
    <div className="border border-stone-200 rounded-md flex-grow">
      <ToolBar/>
      <InputBox />
      <div className="flex justify-end py-2">
        <Button 
          className="px-2 mx-1  hover:bg-green-700"
          onClick={handleConclude}
        >
          Conclude
        </Button>
        <Button 
          className="px-2 mx-1 hover:bg-red-700"
          onClick={handlePerish}
        >
          Perish
        </Button>
      </div>
    </div>
  )
}