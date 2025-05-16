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
            <body className="h-screen w-screen">
                <Navbar />
                <main className="container mx-auto mt-2">
                    <RootProviders>{children}</RootProviders>
                </main>
            </body>
        </html>
    );
}
