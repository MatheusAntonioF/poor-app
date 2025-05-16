import { Suspense } from 'react';
import { Button, Skeleton } from '@heroui/react';

import { ExpensesTable } from '../features/expenses/components/expenses-table';
import { ExpensesService } from '../server/services/expenses.service';

export default function Home() {
    const getAllExpensesPromise = new ExpensesService().getAllExpenses();
    return (
        <>
            <div className="flex items-center justify-end w-full mb-4">
                <Button color="primary">Criar novo gasto</Button>
            </div>
            <Suspense fallback={<Skeleton />}>
                <ExpensesTable getAllExpensesPromise={getAllExpensesPromise} />
            </Suspense>
        </>
    );
}
