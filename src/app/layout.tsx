import './globals.css';
import { RootProviders } from '../providers/root-providers';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="h-screen w-screen">
                <RootProviders>{children}</RootProviders>
            </body>
        </html>
    );
}
