"use client";
import Link from "next/link";
import {Invitados} from "@prisma/client";

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
import {handleEditGuest, handleNewGuest} from "@/lib/api.invitados";
import {MetodosDePago, roomTypes} from "@/lib/const";
import {formatDateToInput} from "@/lib/date";

export default function FormGuest({BodaId, guest}: {BodaId: string; guest?: Invitados}) {
  const formAction = guest ? handleEditGuest : handleNewGuest;

  return (
    <form action={formAction}>
      <Input name="BodaId" type="hidden" value={BodaId} />
      {guest ? <Input name="GuestId" type="hidden" value={guest.id} /> : null}
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="in">IN</Label>
              <Input
                className="justify-center"
                defaultValue={guest?.In ? formatDateToInput(new Date(guest.In)) : ""}
                id="in"
                name="in"
                placeholder="arrive"
                type="date"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="out">OUT</Label>
              <Input
                required
                className="justify-center"
                defaultValue={guest?.Out ? formatDateToInput(new Date(guest.Out)) : ""}
                id="out"
                name="out"
                placeholder="out"
                type="date"
              />
            </div>
            <div />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="night">NIGHTS</Label>
              <Input
                required
                defaultValue={guest?.Nights ? guest.Nights : ""}
                id="night"
                min={0}
                name="nights"
                placeholder="number of the nights"
                type="number"
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
