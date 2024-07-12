import { eq, inArray, and } from "drizzle-orm";
import db from "../";
import { childTable } from "../schema";

export const getChildByIdAndCampus = async (
  childId: number,
  campusId: number
) => {
  return await db
    .select()
    .from(childTable)
    .where(and(eq(childTable.id, childId), eq(childTable.campusId, campusId)))
    .execute();
};

export const getAllChildsByCampus = async (campusId: number) => {
  return await db
    .select()
    .from(childTable)
    .where(eq(childTable.campusId, campusId))
    .execute();
};

export const getChildsByFamilyIdAndCampus = async (
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

export const getChildsByFamilyIdsAndCampus = async (
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
