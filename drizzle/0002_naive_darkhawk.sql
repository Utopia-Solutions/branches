CREATE TABLE IF NOT EXISTS "campus" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "child" (
	"id" serial PRIMARY KEY NOT NULL,
	"campusId" integer NOT NULL,
	"familyId" integer NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"childEnableSMS" boolean NOT NULL,
	"birthdate" date NOT NULL,
	"age" varchar(2) NOT NULL,
	"grade" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "class" (
	"id" serial PRIMARY KEY NOT NULL,
	"campusId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"number" varchar(255),
	"coordinatorEmail" varchar(255) NOT NULL,
	"ageRestriction" boolean NOT NULL,
	"ageGrade" varchar(255) NOT NULL,
	"instructors" text,
	"instructorTitles" text,
	"curriculum" text,
	"textbook" text,
	"isbn" varchar(13),
	"location" varchar(255) NOT NULL,
	"days" varchar(255) NOT NULL,
	"startDate" date NOT NULL,
	"finishDate" date NOT NULL,
	"term" varchar(255) NOT NULL,
	"matrix" varchar(255) NOT NULL,
	"column" varchar(255) NOT NULL,
	"row" varchar(255) NOT NULL,
	"startTime" varchar(5) NOT NULL,
	"endTime" varchar(5) NOT NULL,
	"description" text,
	"studentsRegistered" integer NOT NULL,
	"studentsWaitlisted" integer NOT NULL,
	"maxStudents" integer NOT NULL,
	"minStudents" integer,
	"minStudentsDate" date,
	"parentsRegistered" integer NOT NULL,
	"maxParents" integer NOT NULL,
	"status" varchar(255) NOT NULL,
	"signupStartDateTime" date,
	"deadline" date,
	"viewableSignups" boolean NOT NULL,
	"allowWaitingList" boolean NOT NULL,
	"waitingMessage" text,
	"includeInWeekly" boolean NOT NULL,
	"reminderMessageDays" integer,
	"reminderMessage" text,
	"deposit" varchar(255) NOT NULL,
	"depositAccount" varchar(255),
	"classFee" varchar(255) NOT NULL,
	"classFeeAccount" varchar(255) NOT NULL,
	"books" varchar(255) NOT NULL,
	"booksAccount" varchar,
	"supplies" varchar(255) NOT NULL,
	"suppliesAccount" varchar,
	"paymentType" varchar(255) NOT NULL,
	"allowSecureClassForums" boolean NOT NULL,
	"adminNotes" text,
	"archive" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "family" (
	"id" serial PRIMARY KEY NOT NULL,
	"campusId" integer NOT NULL,
	"primaryLastName" varchar(255) NOT NULL,
	"primaryFirstName" varchar(255) NOT NULL,
	"secondaryLastName" varchar(255),
	"secondaryFirstName" varchar(255),
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"county" varchar(255),
	"state" varchar(2) NOT NULL,
	"zip" varchar(10) NOT NULL,
	"country" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"phoneEnableSMS" boolean NOT NULL,
	"phone2" varchar(20),
	"phone2EnableSMS" boolean,
	"fax" varchar(20),
	"primaryEmail" varchar(255) NOT NULL,
	"secondaryEmail" varchar(255),
	"parkedStatus" boolean NOT NULL,
	"privacyIncludeInDirectory" boolean NOT NULL,
	"section" varchar(255) NOT NULL,
	"churchAffiliation" varchar(255),
	"curriculumTeachingStyle" varchar(255),
	"yearStartedHomeschooling" varchar(4),
	"familyBusinessServices" text,
	"notes" text,
	"profileCreated" date NOT NULL,
	"profileApproved" date,
	"profileUpdated" date,
	"lastLogin" date,
	"pictures" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "registration" (
	"id" serial PRIMARY KEY NOT NULL,
	"campusId" integer NOT NULL,
	"familyId" integer NOT NULL,
	"registrantId" integer NOT NULL,
	"classId" integer NOT NULL,
	"classTitle" varchar(255) NOT NULL,
	"classLocation" varchar(255) NOT NULL,
	"matrix" varchar(255) NOT NULL,
	"column" varchar(255) NOT NULL,
	"row" varchar(255) NOT NULL,
	"instructor" text,
	"instructorTitle" text,
	"coordinatorEmail" varchar(255) NOT NULL,
	"beginDate" date NOT NULL,
	"startTime" varchar(5) NOT NULL,
	"endTime" varchar(5) NOT NULL,
	"classStatus" varchar(255) NOT NULL,
	"deposit" varchar(255) NOT NULL,
	"classFee" varchar(255) NOT NULL,
	"books" varchar(255) NOT NULL,
	"supplies" varchar(255) NOT NULL,
	"paypal" varchar(255),
	"notes" text
);
--> statement-breakpoint
DROP TABLE "magic_link";--> statement-breakpoint
DROP TABLE "session";--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "child" ADD CONSTRAINT "child_campusId_campus_id_fk" FOREIGN KEY ("campusId") REFERENCES "public"."campus"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "child" ADD CONSTRAINT "child_familyId_family_id_fk" FOREIGN KEY ("familyId") REFERENCES "public"."family"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "class" ADD CONSTRAINT "class_campusId_campus_id_fk" FOREIGN KEY ("campusId") REFERENCES "public"."campus"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "family" ADD CONSTRAINT "family_campusId_campus_id_fk" FOREIGN KEY ("campusId") REFERENCES "public"."campus"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registration" ADD CONSTRAINT "registration_campusId_campus_id_fk" FOREIGN KEY ("campusId") REFERENCES "public"."campus"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registration" ADD CONSTRAINT "registration_familyId_family_id_fk" FOREIGN KEY ("familyId") REFERENCES "public"."family"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registration" ADD CONSTRAINT "registration_registrantId_child_id_fk" FOREIGN KEY ("registrantId") REFERENCES "public"."child"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registration" ADD CONSTRAINT "registration_classId_class_id_fk" FOREIGN KEY ("classId") REFERENCES "public"."class"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_campus_email_child" ON "child" USING btree ("campusId","email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_family_id" ON "child" USING btree ("familyId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_campus_title" ON "class" USING btree ("campusId","title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_coordinator_email" ON "class" USING btree ("coordinatorEmail");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_campus_email" ON "family" USING btree ("campusId","primaryEmail");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_primary_email" ON "family" USING btree ("primaryEmail");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_campus_family_class" ON "registration" USING btree ("campusId","familyId","classId");