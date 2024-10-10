import Link from "next/link";

import {GuestList} from "@/components/GuestList";
import {buttonVariants} from "@/components/ui/button";
import {getBodabyId} from "@/lib/api.boda";
interface Params {
  [key: string]: string;
}

export default async function GuestCrud({params}: {params: Params}) {
  const {bodaId} = params;

  console.log({bodaId});
  const boda = await getBodabyId(bodaId);

  console.log(boda);

  return (
    <section className="flex w-full flex-col gap-10">
      <div className="flex w-full justify-end">
        <Link className={buttonVariants({variant: "secondary"})} href={`/Guest/${bodaId}/create`}>
          New guest
        </Link>
      </div>
      <GuestList />
    </section>
  );
}
