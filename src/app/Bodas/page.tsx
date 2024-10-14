import React from "react";
import Link from "next/link";

import {getBoda} from "@/lib/api.boda";
import {buttonVariants} from "@/components/ui/button";

const page = async () => {
  const boda = await getBoda();

  return (
    <section className="w-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Bodas</h1>
        <Link className={buttonVariants({variant: "secondary"})} href="/Bodas/create">
          New boda
        </Link>
      </div>

      {boda.map((body) => (
        <Link key={body.id} className="px-5 text-right" href={`/Guest/${body.id}`}>
          {body.name}
        </Link>
      ))}
    </section>
  );
};

export default page;
