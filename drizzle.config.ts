import "@/drizzle/envConfig";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.POSTGRES_HOST || "",
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT)
      : undefined,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE || "",
    ssl: process.env.POSTGRES_SSL === "true" ? true : false,
  },
});
