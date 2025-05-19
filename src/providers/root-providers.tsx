'use client';

import type { ReactNode } from 'react';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { UploadPdfModal } from '../features/expenses/components/upload-pdf-modal';

interface RootProvidersProps {
    children: ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
    return (
        <HeroUIProvider>
            <ToastProvider />
            {children}
            <UploadPdfModal />
        </HeroUIProvider>
    );
}
