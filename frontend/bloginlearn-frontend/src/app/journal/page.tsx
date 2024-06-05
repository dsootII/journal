import Entry from "./components/entry-box/Entry";
import LeftPanel from "./components/left-panel/LeftPanel";
import JournalNavbar from "./components/navbar";



export default function JournalPage() {


  return (
    <div className="flex w-screen h-screen ">

      <div className="w-1/3">
        <LeftPanel />
      </div>

      <div className="w-2/3 flex flex-col">
        <div>
          <JournalNavbar />
        </div>
        
        <Entry/>

      </div>



    </div>
  )
}