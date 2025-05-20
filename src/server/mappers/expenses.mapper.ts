import { randomUUID } from 'node:crypto';
import {
    convertAmountFromMiliunits,
    convertAmountToMiliunits,
    parseAIExtractedDate,
} from '@/src/utils/utils';
import type { Expense } from '@/src/db/schema';

import { CategorizedExpense } from '../ai/invoices.ai';

export class ExpensesMapper {
    static batchCategorizedToDomain(data: CategorizedExpense): Expense[] {
        return data.expenses.map(raw => {
            return {
                id: randomUUID(),
                bankName: data.invoiceDetails.bankName,
                name: raw.name,
                date: parseAIExtractedDate(raw.date),
                value: convertAmountToMiliunits(raw.value),
                category: raw.category,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });
    }

    static fromDbToDomain(data: Expense[]): Expense[] {
        return data.map((expense: Expense) => ({
            ...expense,
            date: new Date(expense.date),
            value: convertAmountFromMiliunits(expense.value),
        }));
    }
}
