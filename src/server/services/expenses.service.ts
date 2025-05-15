import { db } from "@/src/lib/drizzle";
import { Expense } from "../models/expenses.model";
import { CreateExpense, expensesTable } from "@/src/db/schema";

export class ExpensesService {
  async batchCreate(data: Expense[]) {
    const toCreate: CreateExpense[] = data.map((expense) => ({
      id: expense.id(),
      bankName: expense.bankName(),
      name: expense.name(),
      value: expense.value(),
      date: expense.date(),
      category: expense.category(),
    }));

    await db.insert(expensesTable).values(toCreate);
  }
}
