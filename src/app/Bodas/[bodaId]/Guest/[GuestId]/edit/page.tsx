import FormGuest from "@/components/formGuest";
import {getInvitadoById} from "@/lib/api.invitados";
import {Params} from "@/types/types";

export default async function EditGuest({params}: {params: Params}) {
  const {BodaId, GuestId} = params;
  const guest = await getInvitadoById(GuestId);

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <FormGuest BodaId={BodaId} guest={guest!} />
    </div>
  );
}
