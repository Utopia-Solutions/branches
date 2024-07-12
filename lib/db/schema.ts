import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  text,
  date,
  index,
  uniqueIndex,
  timestamp,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
});
export type User = typeof userTable.$inferSelect;

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
export type Session = typeof sessionTable.$inferSelect;

export const magicLinkTable = pgTable("magic_link", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  token: text("token").notNull(),
});
export type MagicLink = typeof magicLinkTable.$inferSelect;

export const campusTable = pgTable("campus", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zip: varchar("zip", { length: 10 }).notNull(),
});
export type Campus = typeof campusTable.$inferSelect;

export const familyTable = pgTable(
  "family",
  {
    id: serial("id").primaryKey(),
    campusId: integer("campusId")
      .references(() => campusTable.id)
      .notNull(),
    primaryLastName: varchar("primaryLastName", { length: 255 }).notNull(),
    primaryFirstName: varchar("primaryFirstName", { length: 255 }).notNull(),
    secondaryLastName: varchar("secondaryLastName", { length: 255 }),
    secondaryFirstName: varchar("secondaryFirstName", { length: 255 }),
    address: varchar("address", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    county: varchar("county", { length: 255 }),
    state: varchar("state", { length: 2 }).notNull(),
    zip: varchar("zip", { length: 10 }).notNull(),
    country: varchar("country", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    phoneEnableSMS: boolean("phoneEnableSMS").notNull(),
    phone2: varchar("phone2", { length: 20 }),
    phone2EnableSMS: boolean("phone2EnableSMS"),
    fax: varchar("fax", { length: 20 }),
    primaryEmail: varchar("primaryEmail", { length: 255 }).notNull(),
    secondaryEmail: varchar("secondaryEmail", { length: 255 }),
    parkedStatus: boolean("parkedStatus").notNull(),
    privacyIncludeInDirectory: boolean("privacyIncludeInDirectory").notNull(),
    section: varchar("section", { length: 255 }).notNull(),
    churchAffiliation: varchar("churchAffiliation", { length: 255 }),
    curriculumTeachingStyle: varchar("curriculumTeachingStyle", {
      length: 255,
    }),
    yearStartedHomeschooling: varchar("yearStartedHomeschooling", {
      length: 4,
    }),
    familyBusinessServices: text("familyBusinessServices"),
    notes: text("notes"),
    profileCreated: date("profileCreated").notNull(),
    profileApproved: date("profileApproved"),
    profileUpdated: date("profileUpdated"),
    lastLogin: date("lastLogin"),
    pictures: text("pictures"),
  },
  (table) => ({
    uniqueCampusEmail: uniqueIndex("unique_campus_email").on(
      table.campusId,
      table.primaryEmail
    ),
    indexPrimaryEmail: index("index_primary_email").on(table.primaryEmail),
  })
);
export type Family = typeof familyTable.$inferSelect;

export const childTable = pgTable(
  "child",
  {
    id: serial("id").primaryKey(),
    campusId: integer("campusId")
      .references(() => campusTable.id)
      .notNull(),
    familyId: integer("familyId")
      .references(() => familyTable.id)
      .notNull(),
    lastName: varchar("lastName", { length: 255 }).notNull(),
    firstName: varchar("firstName", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    childEnableSMS: boolean("childEnableSMS").notNull(),
    birthdate: date("birthdate").notNull(),
    age: varchar("age", { length: 2 }).notNull(),
    grade: varchar("grade", { length: 10 }).notNull(),
  },
  (table) => ({
    uniqueCampusEmail: uniqueIndex("unique_campus_email_child").on(
      table.campusId,
      table.email
    ),
    indexFamilyId: index("index_family_id").on(table.familyId),
  })
);
export type Child = typeof childTable.$inferSelect;

export const registrationTable = pgTable(
  "registration",
  {
    id: serial("id").primaryKey(),
    campusId: integer("campusId")
      .references(() => campusTable.id)
      .notNull(),
    familyId: integer("familyId")
      .references(() => familyTable.id)
      .notNull(),
    registrantId: integer("registrantId")
      .references(() => childTable.id)
      .notNull(),
    classId: integer("classId")
      .references(() => classTable.id)
      .notNull(),
    classTitle: varchar("classTitle", { length: 255 }).notNull(),
    classLocation: varchar("classLocation", { length: 255 }).notNull(),
    matrix: varchar("matrix", { length: 255 }).notNull(),
    column: varchar("column", { length: 255 }).notNull(),
    row: varchar("row", { length: 255 }).notNull(),
    instructor: text("instructor"),
    instructorTitle: text("instructorTitle"),
    coordinatorEmail: varchar("coordinatorEmail", { length: 255 }).notNull(),
    beginDate: date("beginDate").notNull(),
    startTime: varchar("startTime", { length: 5 }).notNull(),
    endTime: varchar("endTime", { length: 5 }).notNull(),
    classStatus: varchar("classStatus", { length: 255 }).notNull(),
    deposit: varchar("deposit", { length: 255 }).notNull(),
    classFee: varchar("classFee", { length: 255 }).notNull(),
    books: varchar("books", { length: 255 }).notNull(),
    supplies: varchar("supplies", { length: 255 }).notNull(),
    paypal: varchar("paypal", { length: 255 }),
    notes: text("notes"),
  },
  (table) => ({
    indexCampusFamilyClass: index("index_campus_family_class").on(
      table.campusId,
      table.familyId,
      table.classId
    ),
  })
);
export type Registration = typeof registrationTable.$inferSelect;

export const classTable = pgTable(
  "class",
  {
    id: serial("id").primaryKey(),
    campusId: integer("campusId")
      .references(() => campusTable.id)
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    number: varchar("number", { length: 255 }),
    coordinatorEmail: varchar("coordinatorEmail", { length: 255 }).notNull(),
    ageRestriction: boolean("ageRestriction").notNull(),
    ageGrade: varchar("ageGrade", { length: 255 }).notNull(),
    instructors: text("instructors"),
    instructorTitles: text("instructorTitles"),
    curriculum: text("curriculum"),
    textbook: text("textbook"),
    isbn: varchar("isbn", { length: 13 }),
    location: varchar("location", { length: 255 }).notNull(),
    days: varchar("days", { length: 255 }).notNull(),
    startDate: date("startDate").notNull(),
    finishDate: date("finishDate").notNull(),
    term: varchar("term", { length: 255 }).notNull(),
    matrix: varchar("matrix", { length: 255 }).notNull(),
    column: varchar("column", { length: 255 }).notNull(),
    row: varchar("row", { length: 255 }).notNull(),
    startTime: varchar("startTime", { length: 5 }).notNull(),
    endTime: varchar("endTime", { length: 5 }).notNull(),
    description: text("description"),
    studentsRegistered: integer("studentsRegistered").notNull(),
    studentsWaitlisted: integer("studentsWaitlisted").notNull(),
    maxStudents: integer("maxStudents").notNull(),
    minStudents: integer("minStudents"),
    minStudentsDate: date("minStudentsDate"),
    parentsRegistered: integer("parentsRegistered").notNull(),
    maxParents: integer("maxParents").notNull(),
    status: varchar("status", { length: 255 }).notNull(),
    signupStartDateTime: date("signupStartDateTime"),
    deadline: date("deadline"),
    viewableSignups: boolean("viewableSignups").notNull(),
    allowWaitingList: boolean("allowWaitingList").notNull(),
    waitingMessage: text("waitingMessage"),
    includeInWeekly: boolean("includeInWeekly").notNull(),
    reminderMessageDays: integer("reminderMessageDays"),
    reminderMessage: text("reminderMessage"),
    deposit: varchar("deposit", { length: 255 }).notNull(),
    depositAccount: varchar("depositAccount", { length: 255 }),
    classFee: varchar("classFee", { length: 255 }).notNull(),
    classFeeAccount: varchar("classFeeAccount", { length: 255 }).notNull(),
    books: varchar("books", { length: 255 }).notNull(),
    booksAccount: varchar("booksAccount"),
    supplies: varchar("supplies", { length: 255 }).notNull(),
    suppliesAccount: varchar("suppliesAccount"),
    paymentType: varchar("paymentType", { length: 255 }).notNull(),
    allowSecureClassForums: boolean("allowSecureClassForums").notNull(),
    adminNotes: text("adminNotes"),
    archive: boolean("archive").notNull(),
  },
  (table) => ({
    indexCampusTitle: uniqueIndex("index_campus_title").on(
      table.campusId,
      table.title
    ),
    indexCoordinatorEmail: index("index_coordinator_email").on(
      table.coordinatorEmail
    ),
  })
);
export type Class = typeof classTable.$inferSelect;
