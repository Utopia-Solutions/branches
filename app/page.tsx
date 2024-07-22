import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getAllCampuses } from "@/lib/db/queries/campus";

export const metadata: Metadata = {
  title: "Daily Itinerary",
  description: "Daily Itinerary",
};

export default async function HomePage() {
  const user = await getCurrentUser();
  const campuses = await getAllCampuses();

  if (!user) {
    return redirect("/sign-in");
  } else {
    return redirect(`/${campuses[0].id}`);
  }
}
