import { db } from '@/src/lib/drizzle';
import { CreateExpense, expensesTable, type Expense } from '@/src/db/schema';
import { ExpensesMapper } from '../mappers/expenses.mapper';

export class ExpensesService {
    async getAllExpenses() {
        const expenses = await db.select().from(expensesTable);

        return ExpensesMapper.fromDbToDomain(expenses);
    }

    async batchCreate(data: Expense[]) {
        const toCreate: CreateExpense[] = data.map(expense => ({
            id: expense.id,
            bankName: expense.bankName,
            name: expense.name,
            value: expense.value,
            date: expense.date,
            category: expense.category,
        }));

        await db.insert(expensesTable).values(toCreate);
    }
}
