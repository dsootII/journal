import React from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function LoginPage() {

  return(
    <div className="h-full">
      <div className="flex h-full w-full justify-center items-center align-middle">
        
        <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Use this journal to track quests.</CardDescription>
            </CardHeader>
            
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Username</Label>
                    <Input id="name" placeholder="Username..." />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input id="name" placeholder="Email..." />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Password</Label>
                    <Input id="password" placeholder="Password..." type="password" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Confirm Password</Label>
                    <Input id="password" placeholder="Confirm Password..." type="password" />
                  </div>
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline">I have an Account</Button>
              <Button>Signup</Button>
            </CardFooter>
          </Card>

      </div>
    </div>
  )
}