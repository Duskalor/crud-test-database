import React from "react";
import Link from "next/link";

import {getBoda} from "@/lib/api.boda";
import {buttonVariants} from "@/components/ui/button";
import {BodaList} from "@/components/bodaList";

const page = async () => {
  const bodas = await getBoda();

  return (
    <section className="w-full">
      <div className="flex w-full justify-between border-b border-border px-5 pb-3">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Bodas</h1>
        <Link className={buttonVariants({variant: "secondary"})} href="/Bodas/create">
          New boda
        </Link>
      </div>

      <div className="py-2 [&>div]:flex [&>div]:justify-center">
        <BodaList bodas={bodas} />
      </div>
    </section>
  );
};

export default page;
