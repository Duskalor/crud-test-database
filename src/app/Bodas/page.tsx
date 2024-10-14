import React from "react";
import Link from "next/link";

import {getBoda} from "@/lib/api.boda";

const page = async () => {
  const boda = await getBoda();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Bodas</h1>

      {boda.map((body) => (
        <Link key={body.id} className="px-5 text-right" href={`/Guest/${body.id}`}>
          {body.name}
        </Link>
      ))}
    </div>
  );
};

export default page;
