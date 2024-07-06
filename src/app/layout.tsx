import NavBar from '@/components/NavBar/NavBar'
import './globals.css'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="h-screen bg-white flex flex-col">
                <NavBar />
                {children}
            </body>
        </html>
    )
}
