import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function convertAmountFromMiliunits(amount: number) {
    return amount / 1000;
}

export function convertAmountToMiliunits(amount: number) {
    return Math.round(amount * 1000);
}

/**
 * the purpose of this function is to parse the date that was extracted from the pdf
 * in the pdf, the date has this format dd/mm/yyyy
 * however, this format is invalid for javascript
 */
export function parseAIExtractedDate(date: string) {
    const [day, month, year] = date.split('/');

    const finalDate = new Date();

    finalDate.setDate(Number(day));
    finalDate.setMonth(Number(month) - 1);
    finalDate.setFullYear(Number(year));

    return finalDate;
}

export function formatDate(date: Date) {
    return Intl.DateTimeFormat('pt-BR').format(date);
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}
