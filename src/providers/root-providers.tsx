'use client';

import type { ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/react';

interface RootProvidersProps {
    children: ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
    return <HeroUIProvider>{children}</HeroUIProvider>;
}
