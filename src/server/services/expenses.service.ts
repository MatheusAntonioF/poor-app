import { db } from '@/src/lib/drizzle';
import { expensesTable, type Expense } from '@/src/db/schema';
import { ExpensesMapper } from '../mappers/expenses.mapper';
import { and, gte, lte, type SQL } from 'drizzle-orm';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';

export interface GetAllExpensesParams {
    limit?: number;
    from?: Date;
    to?: Date;
}

export class ExpensesService {
    async getAllExpenses({ limit, from, to }: GetAllExpensesParams = {}) {
        from = from ?? subMonths(startOfMonth(new Date()), 1);
        to = to ?? subMonths(endOfMonth(new Date()), 1);

        const filters: SQL[] = [];

        if (from) {
            filters.push(gte(expensesTable.date, from));
        }

        if (to) {
            filters.push(lte(expensesTable.date, to));
        }

        const query = db
            .select()
            .from(expensesTable)
            .where(and(...filters));

        if (limit) {
            query.limit(limit);
        }

        const expenses = await query.execute();
        console.log('🚀 ~ expenses:', expenses);

        return ExpensesMapper.fromDbToDomain(expenses);
    }

    async batchCreate(toCreate: Expense[]) {
        await db.insert(expensesTable).values(toCreate).returning();
    }
}
