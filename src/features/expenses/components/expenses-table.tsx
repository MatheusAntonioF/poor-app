'use client';

import { use } from 'react';
import { Ellipsis, SquarePen, Trash } from 'lucide-react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@heroui/react';
import { formatCurrency, formatDate } from '@/src/utils/utils';
import type { Expense } from '@/src/db/schema';
import { CategoryBadge } from '../../categories/components/category-badge';
import type { CategoryType } from '@/src/server/models/categories.model';
import { SumExpenses } from './sum-expenses';

interface ExpensesTableProps {
    getAllExpensesPromise: Promise<Expense[]>;
}

export function ExpensesTable({ getAllExpensesPromise }: ExpensesTableProps) {
    const expenses = use(getAllExpensesPromise);

    return (
        <Table
            aria-label="Example static collection table"
            topContent={<SumExpenses expenses={expenses} />}
        >
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
                            <TableCell>
                                <CategoryBadge
                                    categoryType={item.category as CategoryType}
                                />
                            </TableCell>
                            <TableCell>{item.bankName}</TableCell>
                            <TableCell>
                                <Popover placement="bottom" showArrow={true}>
                                    <PopoverTrigger>
                                        <Button isIconOnly size="sm">
                                            <Ellipsis />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <div className="flex flex-col items-start justify-start gap-2 p-2">
                                            <Button
                                                className="w-full flex items-center justify-start gap-2"
                                                variant="light"
                                            >
                                                <SquarePen size={14} />
                                                Editar
                                            </Button>
                                            <Button
                                                className="w-full flex items-center justify-start gap-2"
                                                variant="light"
                                            >
                                                <Trash size={14} />
                                                Remover
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
