import NavBar from '@/components/navbar/NavBar'
import AuthProvider from '@/context/AuthContext'
import './globals.css'
import { createClient } from '@/utils/supabase/server'
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { Metadata } from 'next'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

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
            <body className={`${font.className} h-screen flex flex-col`}>
                <AuthProvider serverProps={{ initUser: user }}>
                    <NavBar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}
