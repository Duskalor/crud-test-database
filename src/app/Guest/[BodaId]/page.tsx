import Link from "next/link";

import {GuestList} from "@/components/GuestList";
import {buttonVariants} from "@/components/ui/button";
import {getBodabyId} from "@/lib/api.boda";
import {Params} from "@/types/types";

export default async function GuestCrud({params}: {params: Params}) {
  const {BodaId} = params;
  const boda = await getBodabyId(BodaId);

  return (
    <section className="flex w-full flex-1 flex-col gap-10">
      <div className="flex w-full items-center justify-between px-5">
        <Link className={buttonVariants({variant: "secondary"})} href="/Bodas">
          back
        </Link>
        <h1 className="flex-1 text-center text-2xl font-bold text-gray-800 dark:text-white">
          {boda?.name}
        </h1>
        <Link className={buttonVariants({variant: "secondary"})} href={`/Guest/${BodaId}/create`}>
          New guest
        </Link>
      </div>
      <GuestList id={BodaId} />
    </section>
  );
}
