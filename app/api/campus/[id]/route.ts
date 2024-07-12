import { getCampusById } from "@/lib/db/queries/campus";
import { NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params: { id } }: Params) => {
  const campus = await getCampusById(Number(id));
  return campus;
};
