import db from "@/lib/db";
import { eq } from "drizzle-orm";

export const updateDatabase = async (
  filename: string,
  table: any,
  dataProcessor: Function
) => {
  const data = require(`../${filename}`);
  const campusId = extractCampusIdFromFilename(filename);

  await db.transaction(async (trx) => {
    const existingRecords = await trx
      .select()
      .from(table)
      .where(eq(table.campusId, campusId));
    const existingIds = new Set(
      existingRecords.map((record: any) => record.id)
    );

    for (const record of data) {
      const processedRecord = dataProcessor(record, campusId);
      const [existingRecord] = await trx
        .select()
        .from(table)
        .where(eq(table.id, processedRecord.id));

      if (existingRecord) {
        await trx
          .update(table)
          .set(processedRecord)
          .where(eq(table.id, existingRecord.id));
        existingIds.delete(processedRecord.id);
      } else {
        await trx.insert(table).values(processedRecord);
      }
    }

    for (const id of existingIds) {
      await trx.delete(table).where(eq(table.id, id));
    }
  });
};

const extractCampusIdFromFilename = (filename: string): number | null => {
  const matches = filename.match(/(\d+)\.json/);
  return matches ? parseInt(matches[1], 10) : null;
};
