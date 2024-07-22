import { eq, and, inArray } from "drizzle-orm";
import db from "../";
import { Child, Class, familyTable, Registration } from "../schema";
import {
  getChildsByFamilyIdAndCampusId,
  getChildsByFamilyIdsAndCampusId,
} from "./child";
import { getRegistrationsByFamilyIdAndCampusId } from "./registration";
import { getClassesByIdsAndCampusId } from "./class";

export const getAllFamilyDataByEmailAndCampusId = async (
  primaryEmail: string,
  campusId: number
): Promise<FamilyData | null> => {
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

  const childs = await getChildsByFamilyIdAndCampusId(familyId, campusId);
  const registrations = await getRegistrationsByFamilyIdAndCampusId(
    familyId,
    campusId
  );

  const classIds = registrations.map((reg) => reg.classId);
  const classes = await getClassesByIdsAndCampusId(classIds, campusId);

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

export const getFamilyByIdAndCampusId = async (
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

  const childs = await getChildsByFamilyIdAndCampusId(familyId, campusId);

  return {
    ...family[0],
    childs: childs,
  };
};

export const getAllFamiliesByCampusId = async (campusId: number) => {
  const families = await db
    .select()
    .from(familyTable)
    .where(eq(familyTable.campusId, campusId))
    .execute();

  const familyIds = families.map((family) => family.id);
  const childs = await getChildsByFamilyIdsAndCampusId(familyIds, campusId);

  return families.map((family) => ({
    ...family,
    childs: childs.filter((child) => child.familyId === family.id),
  }));
};

export const getFamilyByChildIdAndCampusId = async (
  childId: number,
  campusId: number
) => {
  const family = await db
    .select()
    .from(familyTable)
    .where(and(eq(familyTable.id, childId), eq(familyTable.campusId, campusId)))
    .execute();
  return family[0] || null;
};

export const getFamilyWithChildsByEmailAndCampusId = async (
  primaryEmail: string,
  campusId: number
) => {
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

  const childs = await getChildsByFamilyIdAndCampusId(family[0].id, campusId);
  if (!family) return null;
  const familyWithChilds = {
    ...family[0],
    childs,
  };
  return familyWithChilds;
};
