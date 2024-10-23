import FormGuest from "@/components/formGuest";
import {Params} from "@/types/types";

export default function NewGuest({params}: {params: Params}) {
  const {bodaId} = params;

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <FormGuest bodaId={bodaId} />
    </div>
  );
}
