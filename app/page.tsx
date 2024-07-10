import { validateSession } from "@/lib/auth";
import WelcomeCard from "@/components/welcome-card";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { user } = await validateSession();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main className="container flex flex-col w-full h-full items-center">
      <WelcomeCard />
    </main>
  );
}
