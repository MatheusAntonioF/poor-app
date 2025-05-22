import { unstable_cache } from 'next/cache';
import {
    ExpensesService,
    type GetAllExpensesParams,
} from '../services/expenses.service';

export const getAllExpenses = unstable_cache(
    async (data: GetAllExpensesParams = {}) => {
        const expenses = await new ExpensesService().getAllExpenses(data);

        return expenses;
    },
    ['expenses'],
    {
        tags: ['expenses'],
    }
);
