import './globals.css';

import { RootProviders } from '../providers/root-providers';
import { Navbar } from '../components/navbar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="h-screen w-screen container mx-auto">
                <Navbar />
                <main className="mt-4 pb-4">
                    <RootProviders>{children}</RootProviders>
                </main>
            </body>
        </html>
    );
}
