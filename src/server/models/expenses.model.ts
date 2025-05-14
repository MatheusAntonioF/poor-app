import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const expensesTable = sqliteTable("users", (t) => ({
  id: text().primaryKey(),
  name: text().notNull(),
  value: integer().notNull(),
  date: integer({ mode: "timestamp" }).notNull(),

  createdAt: integer({ mode: "timestamp" }).defaultNow(),
  updatedAt: integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
}));
