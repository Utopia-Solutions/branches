import { eq, inArray, and } from "drizzle-orm";
import db from "../";
import { childTable } from "../schema";

export const getChildByIdAndCampusId = async (
  childId: number,
  campusId: number
) => {
  const response = await db
    .select()
    .from(childTable)
    .where(and(eq(childTable.id, childId), eq(childTable.campusId, campusId)))
    .execute();
  return response[0];
};

export const getAllChildsByCampusId = async (campusId: number) => {
  return await db
    .select()
    .from(childTable)
    .where(eq(childTable.campusId, campusId))
    .execute();
};

export const getChildsByFamilyIdAndCampusId = async (
  familyId: number,
  campusId: number
) => {
  return await db
    .select()
    .from(childTable)
    .where(
      and(eq(childTable.familyId, familyId), eq(childTable.campusId, campusId))
    )
    .execute();
};

export const getChildsByFamilyIdsAndCampusId = async (
  familyIds: number[],
  campusId: number
) => {
  return await db
    .select()
    .from(childTable)
    .where(
      and(
        inArray(childTable.familyId, familyIds),
        eq(childTable.campusId, campusId)
      )
    )
    .execute();
};
