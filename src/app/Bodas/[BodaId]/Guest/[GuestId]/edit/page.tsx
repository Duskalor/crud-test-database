import Link from "next/link";

import FormGuest from "@/components/formGuest";
import {buttonVariants} from "@/components/ui/button";
import {getInvitadoById} from "@/lib/api.invitados";
import {Params} from "@/types/types";

export default async function EditGuest({params}: {params: Params}) {
  const {BodaId, GuestId} = params;
  const guest = await getInvitadoById(GuestId);

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <Link className={buttonVariants({variant: "outline"})} href={`/Bodas/${BodaId}/Guest`}>
        Back
      </Link>
      <FormGuest BodaId={BodaId} guest={guest!} />
    </div>
  );
}
