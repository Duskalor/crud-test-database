"use client";
import {Boda} from "@prisma/client";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {handleEditBoda} from "@/lib/api.boda";

export function DialogBodaEdit({boda}: {boda: Boda}) {
  const [name, setname] = useState(boda.name);
  const handleNewData = async () => {
    handleEditBoda({...boda, name});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit boda</DialogTitle>
          <DialogDescription>
            Make changes to your Boda here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input
              autoComplete="off"
              className="col-span-3"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleNewData()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
