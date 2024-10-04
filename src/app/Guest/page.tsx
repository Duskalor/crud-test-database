import Link from "next/link";

import {GuestList} from "@/components/GuestList";
import {buttonVariants} from "@/components/ui/button";

export default function GuestCrud() {
  return (
    <section className="flex w-full flex-col gap-10">
      <div className="flex w-full justify-end">
        <Link className={buttonVariants({variant: "secondary"})} href="/Guest/create">
          New guest
        </Link>
      </div>
      <GuestList />
    </section>
  );
}
