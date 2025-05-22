import { ChartCategoriesSummary } from '@/src/features/expenses/components/charts/chart-categories-summary';
import { ChartExpensesSummary } from '@/src/features/expenses/components/charts/chart-expenses-summary';
import { RecentExpenses } from '@/src/features/expenses/components/recent-expenses-summary';
import { getAllExpenses } from '@/src/server/data-access/expenses';

export const dynamic = 'force-dynamic';

export default function Home() {
    const getAllExpensesPromise = getAllExpenses();

    const getAllExpensesWithLimitPromise = getAllExpenses({ limit: 10 });

    return (
        <div className="w-full h-full overflow-y-auto grid grid-cols-3 grid-rows-2 gap-6">
            <div className="col-span-2 row-span-1 w-full h-full">
                <ChartExpensesSummary />
            </div>

            <div className="h-full">
                <ChartCategoriesSummary />
            </div>

            <div className="rows-span-2 col-span-3">
                <RecentExpenses
                    getAllExpensesPromise={getAllExpensesWithLimitPromise}
                />
            </div>
        </div>
    );
}
