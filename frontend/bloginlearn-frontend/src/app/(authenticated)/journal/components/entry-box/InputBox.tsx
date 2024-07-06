import { useJournalContext } from "@/app/context/JournalContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function InputBox () {

  const {currentThought, setCurrentThought, selectedContainer} = useJournalContext();

  console.log(selectedContainer);

  return (
    <Textarea
      className="w-full h-3/4 overflow-visible p-4 bg-stone-100 shadow-xl"
      placeholder="Place your thoughts here."
      value={currentThought}
      onChange={(e) => setCurrentThought(e.target.value)}
    />
  )
}           