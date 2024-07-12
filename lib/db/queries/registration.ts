import { eq, and } from "drizzle-orm";
import db from "../";
import { registrationTable } from "../schema";

export const getRegistrationByIdAndCampus = async (
  registrationId: number,
  campusId: number
) => {
  return await db
    .select()
    .from(registrationTable)
    .where(
      and(
        eq(registrationTable.id, registrationId),
        eq(registrationTable.campusId, campusId)
      )
    )
    .execute();
};

export const getAllRegistrationsByCampus = async (campusId: number) => {
  return await db
    .select()
    .from(registrationTable)
    .where(eq(registrationTable.campusId, campusId))
    .execute();
};

export const getRegistrationsByFamilyIdAndCampus = async (
  familyId: number,
  campusId: number
) => {
  return await db
    .select()
    .from(registrationTable)
    .where(
      and(
        eq(registrationTable.familyId, familyId),
        eq(registrationTable.campusId, campusId)
      )
    )
    .execute();
};
