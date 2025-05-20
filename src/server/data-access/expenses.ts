import { unstable_cache } from 'next/cache';
import { ExpensesService } from '../services/expenses.service';

export const getAllExpenses = unstable_cache(
    async () => {
        const expenses = await new ExpensesService().getAllExpenses();

        return expenses;
    },
    ['expenses'],
    {
        tags: ['expenses'],
    }
);
