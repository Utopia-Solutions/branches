import { validateSession } from "@/lib/auth";
import NavMenu from "./nav-menu";
import Link from "next/link";

export default async function Header() {
  const { user } = await validateSession();
  // TODO: change this when roles are added
  const isAdmin = true;
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <Link href="/" className="text-lg font-bold hover:underline">
        Branches
      </Link>
      {user && <NavMenu isAdmin={isAdmin} />}
    </header>
  );
}
