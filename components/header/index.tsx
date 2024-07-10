import { validateSession } from "@/lib/auth";
import NavMenu from "./nav-menu";
import Link from "next/link";
import Image from "next/image";

export default async function Header() {
  const validSession = await validateSession();
  // TODO: change this when roles are added
  console.log("header validSession?.user", validSession?.user);
  const isAdmin = true;

  return validSession?.user ? (
    <header className="flex items-center justify-between px-2 py-1 border-b">
      <Link href="/" className="text-lg font-bold hover:underline">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </Link>
      <NavMenu isAdmin={isAdmin} />
    </header>
  ) : null;
}
