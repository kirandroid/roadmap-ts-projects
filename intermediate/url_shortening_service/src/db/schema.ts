import { drizzle } from "drizzle-orm/node-postgres";
import * as t from "drizzle-orm/pg-core";

export const urlsTable = t.pgTable("urls", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  url: t.text().notNull(),
  shortCode: t.text().notNull().unique(),
  accessCount: t.integer().default(0).notNull(),
  updatedAt: t.timestamp(),
  createdAt: t.timestamp().defaultNow().notNull(),
  deleted_at: t.timestamp(),
});
