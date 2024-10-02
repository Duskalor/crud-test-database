import * as React from "react";
import Link from "next/link";

import {Textarea} from "./ui/textarea";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormGuest() {
  const handleform = async (data: FormData) => {
    "use server";
    console.log(Object.fromEntries(data));
  };

  return (
    <form action={handleform}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create new guest</CardTitle>
          <CardDescription>Create a new guest in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">NAME</Label>
              <Input id="name" name="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tipohab">TIPO HAB</Label>
              <Select name="tipohab">
                <SelectTrigger id="tipohab" name="tipohab">
                  <SelectValue placeholder="Select a option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="select-none">Metodos de pago</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="in">IN</Label>
              <Input id="in" name="in" placeholder="arrive" type="date" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="out">OUT</Label>
              <Input id="out" name="out" placeholder="out" type="date" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="night">NIGHTS</Label>
              <Input
                id="night"
                min={0}
                name="nights"
                placeholder="number of the nights"
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tarifa">TARIFA</Label>
              <Input id="tarifa" min={0} name="tarifa" placeholder="tarifa" type="number" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="modo">MODO DE PAGO </Label>
              <Select name="modo">
                <SelectTrigger id="modo">
                  <SelectValue placeholder="Select a option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="select-none">Metodos de pago</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="OBSERVACIONES">OBSERVACIONES </Label>
              <Textarea name="observaciones" placeholder="some things to observe" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link className={buttonVariants({variant: "outline"})} href="/Guest">
            Cancel
          </Link>
          <Button type="submit">Create</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
