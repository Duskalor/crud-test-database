import React from "react";
import {CalendarIcon} from "lucide-react";
import dayjs from "dayjs";

import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {Button} from "./ui/button";
import {Calendar} from "./ui/calendar";

import {cn} from "@/lib/utils";

function CalendarBoda({value, setValue}: {value?: Date; setValue: (date: Date) => void}) {
  const date = dayjs(value).format("MMMM DD, YYYY");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn("w-[240px] pl-3 text-left font-normal", !value && "text-muted-foreground")}
          variant="outline"
        >
          {value ? date : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          initialFocus
          required
          // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          mode="single"
          selected={value}
          onSelect={(date) => date && setValue(date)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default CalendarBoda;
