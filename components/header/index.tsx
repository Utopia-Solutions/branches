import { getCurrentUser } from "@/lib/auth";
import NavMenu from "./nav-menu";
import Link from "next/link";
import Image from "next/image";
import CampusSelect from "./campus-select";

export default async function Header() {
  const user = await getCurrentUser();
  // TODO: Check if user is admin
  const isAdmin = true;

  return user ? (
    <header className="flex items-center justify-between px-2 py-1 border-b">
      <Link href="/" className="text-lg font-bold hover:underline">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </Link>
      <CampusSelect />
      <NavMenu isAdmin={isAdmin} />
    </header>
  ) : null;
}
