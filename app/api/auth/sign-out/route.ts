import { lucia, validateSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { session } = await validateSession();
  if (!session) {
    return redirect("/sign-in");
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}
