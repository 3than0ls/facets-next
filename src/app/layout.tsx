import NavBar from '@/components/navbar/NavBar'
import AuthProvider from '@/context/AuthContext'
import './globals.css'
import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'
import { PJSFontClassName } from '@/fonts'

export const metadata: Metadata = {
    title: 'Facets Next',
    description: 'Chat and Sticky-board website',
}

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
            <body className={`${PJSFontClassName} h-screen flex flex-col`}>
                <AuthProvider serverProps={{ initUser: user }}>
                    <NavBar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}
