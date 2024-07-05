import SignInFormCard from "@/components/sign-in-form-card";
import { validateSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { user } = await validateSession();

  if (user) {
    redirect("/");
  }

  return (
    <main className="flex flex-col w-full h-full items-center justify-center">
      <SignInFormCard />
    </main>
  );
}
