import type { Expense } from '@/src/db/schema';
import { formatCurrency } from '@/src/utils/utils';
import { Divider } from '@heroui/react';

interface SumExpensesProps {
    expenses: Expense[];
}

export function SumExpenses({ expenses }: SumExpensesProps) {
    const total = expenses.reduce((acc, expense) => acc + expense.value, 0);

    return (
        <div className="flex flex-col items-start justify-start gap-0.5 w-full">
            <span className="text-xs text-foreground-500">Total</span>
            <span className="text-xl font-bold">{formatCurrency(total)}</span>
            <Divider className="mt-2" />
        </div>
    );
}
