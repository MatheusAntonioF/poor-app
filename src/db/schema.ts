import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expensesTable = sqliteTable('expenses', t => ({
    id: text().primaryKey(),
    name: text().notNull(),
    value: integer().notNull(),
    date: integer({ mode: 'timestamp' }).notNull(),
    bankName: text().notNull(),
    category: text().notNull(),

    createdAt: integer({ mode: 'timestamp' }).defaultNow(),
    updatedAt: integer({ mode: 'timestamp' }).$onUpdate(() => new Date()),
}));

export const createExpenseSchema = createInsertSchema(expensesTable);

export type CreateExpense = z.infer<typeof createExpenseSchema>;

const expenseProps = createSelectSchema(expensesTable);

export type Expense = z.infer<typeof expenseProps>;
