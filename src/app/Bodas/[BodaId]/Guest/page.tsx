import Link from "next/link";
import {redirect} from "next/navigation";

import {GuestList} from "@/app/Bodas/[BodaId]/Guest/GuestList";
import {buttonVariants} from "@/components/ui/button";
import {getBodabyId} from "@/lib/api.boda";
import {Params} from "@/types/types";
import prisma from "@/lib/prisma";

export default async function GuestCrud({params}: {params: Params}) {
  const {BodaId} = params;

  if (!BodaId) redirect(`/Bodas`);

  const boda = await getBodabyId(BodaId);
  const guests = await prisma.invitados.findMany({where: {BodaId}});

  return (
    <section className="flex w-full flex-1 flex-col gap-10">
      <div className="flex w-full items-center justify-between border-b border-border px-5 pb-3">
        <Link className={buttonVariants({variant: "secondary"})} href="/Bodas">
          back
        </Link>
        <h1 className="flex-1 text-center text-2xl font-bold text-gray-800 dark:text-white">
          {boda?.name}
        </h1>
        <Link className={buttonVariants({variant: "secondary"})} href="Guest/create">
          New guest
        </Link>
      </div>
      <GuestList guests={guests} />
    </section>
  );
}
