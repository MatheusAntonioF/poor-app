'use client';

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Card,
    CardBody,
    CardHeader,
    Divider,
} from '@heroui/react';
import { formatCurrency, formatDate } from '@/src/utils/utils';
import type { Expense } from '@/src/db/schema';
import { CategoryBadge } from '../../categories/components/category-badge';
import type { CategoryType } from '@/src/server/models/categories.model';
import { use } from 'react';

interface RecentExpensesProps {
    getAllExpensesPromise: Promise<Expense[]>;
}

export function RecentExpenses({ getAllExpensesPromise }: RecentExpensesProps) {
    const expenses = use(getAllExpensesPromise);
    console.log('🚀 ~ expenses:', expenses);

    return (
        <Card classNames={{ base: 'h-full' }}>
            <CardHeader>
                <h4 className="font-bold text-large">Gastos mais recentes</h4>
            </CardHeader>
            <Divider />
            <CardBody>
                <Table
                    aria-label="Example static collection table"
                    removeWrapper
                >
                    <TableHeader>
                        <TableColumn>Nome</TableColumn>
                        <TableColumn>Valor</TableColumn>
                        <TableColumn>Data</TableColumn>
                        <TableColumn>Categoria</TableColumn>
                        <TableColumn>Banco</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={'Sem gastos cadastrados'}>
                        {expenses.map(item => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {formatCurrency(item.value)}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(new Date(item.date))}
                                    </TableCell>
                                    <TableCell>
                                        <CategoryBadge
                                            categoryType={
                                                item.category as CategoryType
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{item.bankName}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
}
