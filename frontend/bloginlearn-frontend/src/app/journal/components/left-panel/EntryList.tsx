import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function EntryList () {

  //testing with dummy entries for now, direct hardcoding

  return (
    <div>
      <Card className="bg-slate-500">
        <CardHeader>
          <CardTitle >Entries</CardTitle>
        </CardHeader>

        <CardContent className="overflow-y-auto">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entry 1</CardTitle>
              </CardHeader>
              <CardContent> Entry content </CardContent>
              <CardFooter>Created on date</CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entry 2</CardTitle>
              </CardHeader>
              <CardContent> Entry content </CardContent>
              <CardFooter>Created on date</CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entry 3</CardTitle>
              </CardHeader>
              <CardContent> Entry content </CardContent>
              <CardFooter>Created on date</CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entry 4</CardTitle>
              </CardHeader>
              <CardContent> Entry content </CardContent>
              <CardFooter>Created on date</CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entry 5</CardTitle>
              </CardHeader>
              <CardContent> Entry content </CardContent>
              <CardFooter>Created on date</CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}