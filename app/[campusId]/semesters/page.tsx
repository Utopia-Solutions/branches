import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SemestersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="container flex flex-col w-full h-full items-center pt-4">
      <h1 className="text-4xl font-bold p-4">Semesters</h1>
    </main>
  );
}
