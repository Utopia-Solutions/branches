import { validateSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const validSession = await validateSession();

  if (!validSession?.user) {
    return redirect("/sign-in");
  }

  return redirect("/itinerary");
}
