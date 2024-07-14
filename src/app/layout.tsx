import NavBar from '@/components/navbar/NavBar'
import AuthProvider from '@/context/AuthContext'
import './globals.css'
import { createClient } from '@/utils/supabase/server'
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from 'next/font/google'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

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
                <body className={`${font.className} h-screen flex flex-col`}>
                    <NavBar />
                    {children}
                </body>
            </AuthProvider>
        </html>
    )
}
