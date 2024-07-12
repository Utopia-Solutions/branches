import db from "../";
import { campusTable } from "../schema";
import { eq } from "drizzle-orm";

export const getCampusById = async (campusId: number) => {
  const campus = await db
    .select()
    .from(campusTable)
    .where(eq(campusTable.id, campusId))
    .execute();

  return campus[0] || null;
};

export const getAllCampuses = async () => db.select().from(campusTable).execute();
  
