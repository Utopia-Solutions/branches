import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Itinerary from "./_components/itinerary";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <Itinerary />;
}
