import Link from "next/link";

export function Sidebar() {
  return (
    <div className="flex w-40 flex-col gap-5 border-border p-5 text-center [&>*]:border">
      <Link href="/"> Dashboard</Link>
      <Link href="/Guest"> Guest</Link>
    </div>
  );
}
