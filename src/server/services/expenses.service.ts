import { db } from '@/src/lib/drizzle';
import { expensesTable, type Expense } from '@/src/db/schema';
import { ExpensesMapper } from '../mappers/expenses.mapper';

export class ExpensesService {
    async getAllExpenses() {
        const expenses = await db.select().from(expensesTable);

        return ExpensesMapper.fromDbToDomain(expenses);
    }

    async batchCreate(toCreate: Expense[]) {
        await db.insert(expensesTable).values(toCreate).returning();
    }
}
