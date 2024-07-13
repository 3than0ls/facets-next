'use server'

import NavBar from '@/components/navbar/NavBar'
import AuthProvider from '@/context/AuthContext'
import './globals.css'
import { createClient } from '@/utils/supabase/server'

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <html lang="en">
            <AuthProvider serverProps={{ initUser: user }}>
                <body className="h-screen flex flex-col">
                    <NavBar />
                    {children}
                </body>
            </AuthProvider>
        </html>
    )
}
