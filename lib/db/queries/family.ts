import { eq, and, inArray } from "drizzle-orm";
import db from "../";
import { Child, Class, familyTable, Registration } from "../schema";
import {
  getChildsByFamilyIdAndCampus,
  getChildsByFamilyIdsAndCampus,
} from "./child";
import { getRegistrationsByFamilyIdAndCampus } from "./registration";
import { getClassesByIdsAndCampus } from "./class";

export const getAllFamilyDataByEmailAndCampus = async (
  primaryEmail: string,
  campusId: number
):Promise<FamilyData | null> => {
  const family = await db
    .select()
    .from(familyTable)
    .where(
      and(
        eq(familyTable.primaryEmail, primaryEmail),
        eq(familyTable.campusId, campusId)
      )
    )
    .execute();

  if (!family.length) return null;

  const familyId = family[0].id;

  const childs = await getChildsByFamilyIdAndCampus(familyId, campusId);
  const registrations = await getRegistrationsByFamilyIdAndCampus(
    familyId,
    campusId
  );

  const classIds = registrations.map((reg) => reg.classId);
  const classes = await getClassesByIdsAndCampus(classIds, campusId);

  return {
    primaryPhone: "",
    secondaryPhone: "",
    ...family[0],
    secondaryEmail: family[0].secondaryEmail ?? "",
    childs: childs,
    registrations: registrations.map((reg) => ({
      ...reg,
      class: classes.find((cls) => cls.id === reg.classId) as Class,
    })),
  };
};
interface RegistrationWithClass extends Registration {
  class: Class | undefined;
}

export interface FamilyData {
  id: number;
  campusId: number;
  primaryEmail: string;
  secondaryEmail: string;
  primaryPhone: string;
  secondaryPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  childs: Child[];
  registrations: RegistrationWithClass[];
}

export const getFamilyByIdAndCampus = async (
  familyId: number,
  campusId: number
) => {
  const family = await db
    .select()
    .from(familyTable)
    .where(
      and(eq(familyTable.id, familyId), eq(familyTable.campusId, campusId))
    )
    .execute();

  if (!family.length) return null;

  const childs = await getChildsByFamilyIdAndCampus(familyId, campusId);

  return {
    ...family[0],
    childs: childs,
  };
};

export const getAllFamiliesByCampus = async (campusId: number) => {
  const families = await db
    .select()
    .from(familyTable)
    .where(eq(familyTable.campusId, campusId))
    .execute();

  const familyIds = families.map((family) => family.id);
  const childs = await getChildsByFamilyIdsAndCampus(familyIds, campusId);

  return families.map((family) => ({
    ...family,
    childs: childs.filter((child) => child.familyId === family.id),
  }));
};
