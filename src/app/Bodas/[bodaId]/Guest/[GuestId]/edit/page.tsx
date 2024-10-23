import FormGuest from "@/components/formGuest";
import {Params} from "@/types/types";

export default function EditGuest({params}: {params: Params}) {
  const {BodaId, GuestId} = params;

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <FormGuest GuestId={GuestId} bodaId={BodaId} />
    </div>
  );
}
