import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DropdownMenuDemo } from "./ContainerDropdown"
import { useJournalContext } from "@/app/context/JournalContext";

interface Entry {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  user: number;
  container: number;
}

interface Container {
  name: string;
  entries: Entry[];
}

interface ContainerDetailProps {
  selectedContainer: Container;
}

export default function ContainerDetail() {

  const { selectedContainer } = useJournalContext();

  return (
    <div className="h-1/6" >
      <Card className="bg-stone-400 hover:bg-stone-600 h-full rounded-none">
        <CardHeader>
          <CardTitle>
            {selectedContainer?.name || "Add containers on Account Page"}
          </CardTitle>
          <CardDescription>No. of entries: {selectedContainer?.entries?.length || "Add containers on Account Page"}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}