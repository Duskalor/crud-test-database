import Link from "next/link";

export async function Sidebar() {
  return (
    <div className="r flex flex-col gap-5 border-border p-5 text-center lg:w-1/5">
      <Link href="/"> Dashboard</Link>
      <Link href="/Bodas"> Bodas</Link>
    </div>
  );
}
