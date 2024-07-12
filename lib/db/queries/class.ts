import { eq, and, inArray } from "drizzle-orm";
import db from "../";
import { classTable } from "../schema";

export const getClassByIdAndCampus = async (
  classId: number,
  campusId: number
) => {
  return await db
    .select()
    .from(classTable)
    .where(and(eq(classTable.id, classId), eq(classTable.campusId, campusId)))
    .execute();
};

export const getAllClassesByCampus = async (campusId: number) => {
  return await db
    .select()
    .from(classTable)
    .where(eq(classTable.campusId, campusId))
    .execute();
};

export const getClassesByInstructorEmailAndCampus = async (
  instructorEmail: string,
  campusId: number
) => {
  return await db
    .select()
    .from(classTable)
    .where(
      and(
        eq(classTable.coordinatorEmail, instructorEmail),
        eq(classTable.campusId, campusId)
      )
    )
    .execute();
};

export const getClassesByIdsAndCampus = async (
  classIds: number[],
  campusId: number
) => {
  return await db
    .select()
    .from(classTable)
    .where(
      and(inArray(classTable.id, classIds), eq(classTable.campusId, campusId))
    )
    .execute();
};
