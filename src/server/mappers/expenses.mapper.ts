import {
    convertAmountFromMiliunits,
    parseAIExtractedDate,
} from '@/src/utils/utils';
import { CategorizedExpense } from '../ai/invoices.ai';
import type { Expense } from '@/src/db/schema';

export class ExpensesMapper {
    static batchCategorizedToDomain(data: CategorizedExpense) {
        return data.expenses.map(raw => {
            return {
                bankName: data.invoiceDetails.bankName,
                name: raw.name,
                date: parseAIExtractedDate(raw.date),
                value: convertAmountFromMiliunits(raw.value),
                category: raw.category,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });
    }

    static fromDbToDomain(data: Expense[]): Expense[] {
        return data.map((expense: Expense) => ({
            ...expense,
            value: convertAmountFromMiliunits(expense.value),
        }));
    }
}
