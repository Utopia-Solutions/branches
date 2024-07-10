import { lucia, validateSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(): Promise<Response> {
  const validSession = await validateSession();
  if (!validSession?.session) {
    redirect("/");
  }

  await lucia.invalidateSession(validSession.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect("/");
}
