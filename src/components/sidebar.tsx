import Link from "next/link";

import {getBoda} from "@/lib/api.boda";

export async function Sidebar() {
  const boda = await getBoda();

  return (
    <div className="fixed left-0 flex h-full w-40 flex-col gap-5 border-border p-5 text-center [&>*]:border">
      <Link href="/"> Dashboard</Link>
      {boda.map((body) => (
        <Link key={body.id} href={`/Guest/${body.id}`}>
          {body.name}
        </Link>
      ))}
    </div>
  );
}
