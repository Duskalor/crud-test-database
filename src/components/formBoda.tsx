"use client";
import Link from "next/link";

import {Button, buttonVariants} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {handleformBoda} from "@/lib/api.boda";

export default function FormBoda() {
  return (
    <form action={handleformBoda}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create new Boda</CardTitle>
          <CardDescription>Create a new boda in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">NAME</Label>
              <Input required id="name" name="name" placeholder="Name of your Boda" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link className={buttonVariants({variant: "outline"})} href="/Bodas">
            Cancel
          </Link>
          <Button type="submit">Create</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
