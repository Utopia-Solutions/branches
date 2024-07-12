import db from "../index";
import {
  familyTable,
  childTable,
  registrationTable,
  classTable,
  campusTable,
} from "../schema";
import { campuses } from "./data/campuses";
import { families } from "./data/families";
import { children } from "./data/children";
import { classes } from "./data/classes";
import { registrations } from "./data/registrations";

const seedDatabase = async () => {
  // Clear existing data
  await db.delete(familyTable).execute();
  await db.delete(childTable).execute();
  await db.delete(registrationTable).execute();
  await db.delete(classTable).execute();
  await db.delete(campusTable).execute();

  // Insert campuses
  for (const campus of campuses) {
    await db.insert(campusTable).values(campus);
  }

  // Insert families
  for (const family of families) {
    await db.insert(familyTable).values(family);
  }

  // Insert children
  for (const child of children) {
    await db.insert(childTable).values(child);
  }

  // Insert classes
  for (const cls of classes) {
    await db.insert(classTable).values(cls);
  }

  // Insert registrations
  for (const registration of registrations) {
    await db.insert(registrationTable).values(registration);
  }

  console.log("Database seeded successfully");
};

seedDatabase().catch(console.error);
