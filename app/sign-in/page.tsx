import SignInFormCard from "./_components/sign-in-form-card";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="container flex flex-col w-full h-full items-center justify-center">
      <SignInFormCard />
    </main>
  );
}
