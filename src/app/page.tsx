import { Suspense } from 'react';
import { Skeleton } from '@heroui/react';

import { ExpensesTable } from '../features/expenses/components/expenses-table';
import { ExpensesService } from '../server/services/expenses.service';

export default function Home() {
    const getAllExpensesPromise = new ExpensesService().getAllExpenses();
    return (
        <main>
            <Suspense fallback={<Skeleton />}>
                <ExpensesTable getAllExpensesPromise={getAllExpensesPromise} />
            </Suspense>
        </main>
    );
}
