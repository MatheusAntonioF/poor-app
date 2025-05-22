'use client';

import { Pie, PieChart } from 'recharts';

import { Card, CardHeader, CardBody } from '@heroui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/src/components/chart';
import { Divider } from '@heroui/react';

const chartData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    chrome: {
        label: 'Chrome',
        color: 'hsl(var(--chart-1))',
    },
    safari: {
        label: 'Safari',
        color: 'hsl(var(--chart-2))',
    },
    firefox: {
        label: 'Firefox',
        color: 'hsl(var(--chart-3))',
    },
    edge: {
        label: 'Edge',
        color: 'hsl(var(--chart-4))',
    },
    other: {
        label: 'Other',
        color: 'hsl(var(--chart-5))',
    },
} satisfies ChartConfig;

export function ChartCategoriesSummary() {
    return (
        <Card className="h-full">
            <CardHeader>
                <h4 className="font-bold text-large">Categorias</h4>
            </CardHeader>
            <Divider />
            <CardBody>
                <ChartContainer config={chartConfig}>
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            label
                            nameKey="browser"
                        />
                    </PieChart>
                </ChartContainer>
            </CardBody>
        </Card>
    );
}
