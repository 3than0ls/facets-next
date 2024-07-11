import NavBar from '@/components/navbar/NavBar'
import AuthProvider from '@/context/AuthContext'
import './globals.css'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <AuthProvider>
                <body className="h-screen bg-white flex flex-col">
                    <NavBar />
                    {children}
                </body>
            </AuthProvider>
        </html>
    )
}
