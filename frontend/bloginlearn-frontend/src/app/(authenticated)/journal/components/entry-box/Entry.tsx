import { Button } from "@/components/ui/button";
import InputBox from "./InputBox";
import ToolBar from "./ToolBar";
import { useJournalContext } from "@/app/context/JournalContext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL, ENDPOINTS } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ConclusionButtonWithToast from "./ConclusionToast";


export default function Entry() {
  const router = useRouter();
  const [dbCallData, setDbCallData] = useState({});
  const {
    currentThought,
    currentThoughtTitle,
    setCurrentThought,
    setCurrentThoughtTitle,
    selectedContainer,
    setSelectedContainer,
    setListUpdated
  } = useJournalContext();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.post(BACKEND_URL + ENDPOINTS.createEntry, dbCallData)
      .then(res => {
        console.log("entry creation response", res)

        setOpen(true)

        // router.refresh();
        // debugger;
        // // setSelectedContainer()
        // var ent: Entry = {
        //   id: 0,
        //   title: "",
        //   body: "",
        //   created_at: "",
        //   updated_at: "",
        //   user: 1,
        //   container: 1,
        // };
        // selectedContainer.entries.push(ent);
      })
      .catch(err => {
        console.log(err)
      })
  }, [dbCallData])

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const timerRef = useRef(0);

  function handleThoughtConclusion() {
    const data = {
      title: currentThoughtTitle,
      body: currentThought,
      container: selectedContainer.id
    }
    setDbCallData(data);

    setOpen(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 100);
    setCurrentThought('');
    setCurrentThoughtTitle('');
    setListUpdated(true);
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
      <ToolBar />
      <InputBox />
      <div className="flex justify-end py-2 pr-5">
        <div className="flex h-full items-center">
          <ConclusionButtonWithToast
            open={open}
            setOpen={setOpen}
            handleThoughtConclusion={handleThoughtConclusion}
          />
          <Button
            className="px-2 mx-1 hover:bg-red-700 h-[35px] rounded"
            onClick={handlePerish}
          >
            Perish
          </Button>
        </div>
      </div>
    </div>
  )
}