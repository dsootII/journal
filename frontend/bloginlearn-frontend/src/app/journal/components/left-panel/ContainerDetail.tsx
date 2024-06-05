import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function ContainerDetail() {

  return (
    <div >
      <Card className="hover:bg-slate-200">
        <CardHeader>
          <CardTitle>Container Name</CardTitle>
          <CardDescription>Container description</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}