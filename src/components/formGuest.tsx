"use client";
import Link from "next/link";
import {Invitados} from "@prisma/client";
import {useState} from "react";
import {DateRange} from "react-day-picker";

import {Textarea} from "./ui/textarea";
import {Calendar} from "./ui/calendar";

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
import {handleEditGuest, handleNewGuest} from "@/lib/api.invitados";
import {MetodosDePago, roomTypes} from "@/lib/const";
// import {formatDateToInput} from "@/lib/date";

export default function FormGuest({BodaId, guest}: {BodaId: string; guest?: Invitados}) {
  const [date, setDate] = useState<DateRange | undefined>(
    guest ? {from: new Date(guest.In), to: new Date(guest.Out)} : undefined,
  );
  const formAction = guest ? handleEditGuest : handleNewGuest;

  const diff =
    date?.to && date?.from
      ? (new Date(date.to).getTime() - new Date(date.from).getTime()) / (1000 * 60 * 60 * 24)
      : 0;

  return (
    <form action={formAction.bind(null, date!)}>
      <Input readOnly className="hidden" name="BodaId" value={BodaId} />
      {guest ? <Input readOnly className="hidden" name="GuestId" value={guest.id} /> : null}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{guest ? "Edit Guest" : "Create new guest"}</CardTitle>
          <CardDescription>
            {guest ? "Edit guest in the database." : "Create a new guest in the database."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">NAME</Label>
              <Input
                required
                defaultValue={guest?.name ? guest.name : ""}
                id="name"
                name="name"
                placeholder="Name of your guest"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tipohab">TIPO HAB</Label>
              <Select
                required
                defaultValue={guest?.TipoHab ? guest.TipoHab : "select-none"}
                name="tipohab"
              >
                <SelectTrigger id="tipohab" name="tipohab">
                  <SelectValue placeholder="Select a option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="select-none">Select type of room</SelectLabel>
                    {roomTypes.map((roomType) => (
                      <SelectItem key={roomType.value} value={roomType.value}>
                        {roomType.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="codigo">CODIGO</Label>
              <Input
                required
                defaultValue={guest?.Codigo ? guest.Codigo : ""}
                id="codigo"
                min={0}
                name="codigo"
                placeholder="write the codigo"
                type="number"
              />
            </div>
            <div>
              <Calendar
                className="rounded-md border"
                disabled={{before: new Date()}}
                mode="range"
                selected={date}
                onSelect={(range) => setDate(range)}
              />
            </div>

            <div />
            {/* NIGHT */}
            <div className="flex flex-col space-y-1.5">
              <Label>NIGHTS</Label>
              <Input
                readOnly
                className="w-full cursor-not-allowed rounded border-gray-800 p-2 text-gray-500 focus-visible:outline-none"
                // defaultValue={diff}
                id="night"
                min={0}
                name="nights"
                placeholder="number of the nights"
                style={{outline: "none"}}
                type="number"
                value={diff}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tarifa">TARIFA</Label>
              <Input
                required
                defaultValue={guest?.Tarifa ? guest.Tarifa : ""}
                id="tarifa"
                min={0}
                name="tarifa"
                placeholder="tarifa"
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="modo">MODO DE PAGO </Label>
              <Select
                defaultValue={guest?.ModoDePago ? guest?.ModoDePago : "select-none"}
                name="modo"
              >
                <SelectTrigger id="modo">
                  <SelectValue placeholder="Select a option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="select-none">Metodos de pago</SelectLabel>

                    {MetodosDePago.map((metodo) => (
                      <SelectItem key={metodo.nombre} value={metodo.nombre}>
                        {metodo.nombre}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="OBSERVACIONES">OBSERVACIONES </Label>
              <Textarea
                defaultValue={guest?.Observaciones ? guest.Observaciones : ""}
                name="observaciones"
                placeholder="some things to observe"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link className={buttonVariants({variant: "outline"})} href={`/Bodas/${BodaId}/Guest`}>
            Cancel
          </Link>
          <Button type="submit">{guest ? "Update" : "Create"}</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
