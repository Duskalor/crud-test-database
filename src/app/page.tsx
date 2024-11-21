import {handlerSeederInvitados} from "@/lib/api.invitados";
import prisma from "@/lib/prisma";

export default async function HomePage() {
  // const data = await handlerSeederInvitados();

  // console.log(data);

  return <section className="w-full">DashBoard</section>;
}
