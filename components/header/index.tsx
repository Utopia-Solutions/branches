import { getCurrentUser } from "@/lib/auth";
import NavMenu from "./nav-menu";
import Link from "next/link";
import Image from "next/image";
import CampusSelect from "./campus-select";
import { getAllCampuses } from "@/lib/db/queries/campus";

export default async function Header({
  selectedCampusId,
}: {
  selectedCampusId: number;
}) {
  const user = await getCurrentUser();
  if (!user) return null;
  // TODO: Check if user is admin
  const isAdmin = true;
  const campuses = await getAllCampuses();
  const selectedCampus = campuses.find(
    (campus) => campus.id === selectedCampusId
  );

  return (
    <header className="flex items-center justify-between px-2 py-1 border-b">
      <Link href="/" className="text-lg font-bold hover:underline">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </Link>
      <CampusSelect campuses={campuses} selectedCampus={selectedCampus} />
      <NavMenu selectedCampusId={selectedCampusId} isAdmin={isAdmin} />
    </header>
  );
}
