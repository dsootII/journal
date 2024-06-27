import { useJournalContext } from "@/app/context/JournalContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function InputBox () {

  const {currentThought} = useJournalContext();

  return (
    <Textarea
      className="w-full h-3/4 overflow-visible p-4"
      placeholder="Place your thoughts here."
      value={currentThought}
    />
  )
}