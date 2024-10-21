"use client";
import {Boda} from "@prisma/client";
import {useEffect, useState} from "react";

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
  const [name, setName] = useState(boda.name);
  const [open, setOpen] = useState(false);

  const handleNewData = async () => {
    setOpen(false);
    handleEditBoda({...boda, name});
  };

  useEffect(() => {
    const handlekeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setOpen(false);
        handleEditBoda({...boda, name});
      }
    };

    window.addEventListener("keydown", handlekeyDown);

    return () => window.removeEventListener("keydown", handlekeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Edit
        </Button>
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
              onChange={(e) => setName(e.target.value)}
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
