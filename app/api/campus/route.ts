import { getAllCampuses } from "@/lib/db/queries/campus";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const campuses = await getAllCampuses();
  return Response.json(campuses);
};
