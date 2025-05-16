'use client';

import { use } from 'react';
import { Ellipsis } from 'lucide-react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@heroui/react';

import { formatCurrency, formatDate } from '@/src/utils/utils';
import type { Expense } from '@/src/db/schema';

interface ExpensesTableProps {
    getAllExpensesPromise: Promise<Expense[]>;
}

export function ExpensesTable({ getAllExpensesPromise }: ExpensesTableProps) {
    const expenses = use(getAllExpensesPromise);

    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Valor</TableColumn>
                <TableColumn>Data</TableColumn>
                <TableColumn>Categoria</TableColumn>
                <TableColumn>Banco</TableColumn>
                <TableColumn>
                    <span />
                </TableColumn>
            </TableHeader>
            <TableBody>
                {expenses.map(item => {
                    return (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{formatCurrency(item.value)}</TableCell>
                            <TableCell>{formatDate(item.date)}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.bankName}</TableCell>
                            <TableCell>
                                <Ellipsis />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
