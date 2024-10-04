import Link from "next/link";

export function Sidebar() {
  return (
    <div className="fixed left-0 flex h-full w-40 flex-col gap-5 border-border p-5 text-center [&>*]:border">
      <Link href="/"> Dashboard</Link>
      <Link href="/Guest"> Guest</Link>
    </div>
  );
}
