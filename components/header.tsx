import { validateSession } from "@/lib/auth";
import SignOutButton from "./sign-out-button";

export default async function Header() {
  const { user } = await validateSession();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <div className="text-lg font-semibold">Branches</div>
      {user && <SignOutButton />}
    </header>
  );
}
