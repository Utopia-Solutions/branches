import { redirect } from "next/navigation";

export default function CampusPage({
  params: { campusId },
}: {
  params: { campusId: string };
}) {
  return redirect(`/${campusId}/itinerary`);
}
