"use client";
import { Button } from "@/components/ui/button";
import InputBox from "./InputBox";
import ToolBar from "./ToolBar";
import { useJournalContext } from "@/context/JournalContext";
import { useEffect, useRef, useState } from "react";
import { ENDPOINTS } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ConclusionButtonWithToast from "./ConclusionToast";
import createAxiosInstance from "@/lib/CustomAxios";


export default function Entry() {
  const router = useRouter();
  const [dbCallDataConclusion, setDbCallDataConclusion] = useState({});
  const {
    currentThought,
    currentThoughtTitle,
    setCurrentThought,
    setCurrentThoughtTitle,
    selectedContainer,
    setSelectedContainer,
    setListUpdated,
    selectedEntry
  } = useJournalContext();

  const [open, setOpen] = useState(false);
  const [perishSwitch, togglePerishSwitch] = useState(false);

  useEffect(() => {
    const axiosInstance = createAxiosInstance();
    axiosInstance.post(ENDPOINTS.createEntry, dbCallDataConclusion)
      .then(res => {
        console.log("entry creation response", res)
        setOpen(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dbCallDataConclusion])

  useEffect(() => {
    if (selectedEntry) {
      createAxiosInstance().delete(ENDPOINTS.createEntry + `${selectedEntry.id}/`)
        .then(res => {
          console.log(res?.data);
          setListUpdated(true);                             
        })
        .catch(err => console.log(err))
    }

    return () => togglePerishSwitch(false)
  }, [perishSwitch])

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
    setDbCallDataConclusion(data);

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
      togglePerishSwitch(true);
    }
  }
  // h-screen w-screen flex bg-gradient-to-r from-white to-stone-800
  return (
    <div className="flex-grow bg-gradient-to-t from-stone-700 to-stone-100 ">
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