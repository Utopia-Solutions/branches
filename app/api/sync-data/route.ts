import { NextRequest, NextResponse } from "next/server";
import { fetchDataFromFTP } from "@/cron/fetch-data-from-ftp";
import { updateDatabase } from "@/cron/update-database";
import {
  processFamilyData,
  processClassData,
  processRegistrationData,
} from "@/cron/process-data";
import {
  familyTable,
  childTable,
  classTable,
  registrationTable,
} from "@/lib/db/schema";
import db from "@/lib/db";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const filenames = ["families.json", "registrations.json", "classes.json"]; // Example filenames

    for (const filename of filenames) {
      await fetchDataFromFTP(filename);
    }

    await updateDatabase(
      "families.json",
      familyTable,
      (family: any, campusId: number) => {
        const { processedFamily, children } = processFamilyData(
          family,
          campusId
        );
        updateChildren(children, campusId);
        return processedFamily;
      }
    );

    await updateDatabase("classes.json", classTable, processClassData);
    await updateDatabase(
      "registrations.json",
      registrationTable,
      processRegistrationData
    );

    return NextResponse.json({ message: "Data synchronized successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Data synchronization failed" },
      { status: 500 }
    );
  }
}

const updateChildren = async (children: any[], campusId: number) => {
  const existingChildIds = new Set(
    (
      await db
        .select()
        .from(childTable)
        .where(eq(childTable.campusId, campusId))
    ).map((child) => child.id)
  );

  for (const child of children) {
    const [existingChild] = await db
      .select()
      .from(childTable)
      .where(eq(childTable.id, child.id));

    if (existingChild) {
      await db
        .update(childTable)
        .set(child)
        .where(eq(childTable.id, existingChild.id));
      existingChildIds.delete(child.id);
    } else {
      await db.insert(childTable).values(child);
    }
  }

  for (const id of existingChildIds) {
    await db.delete(childTable).where(eq(childTable.id, id));
  }
};
