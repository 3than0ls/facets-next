'use client'

import React, { useContext, createContext, useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

type AuthProviderProps = {
    serverProps: {
        initUser: User | null
    }
    children: React.ReactNode
}

type AuthContextType = {
    user: User | undefined | null
}

const AuthContext = createContext<AuthContextType>({
    user: undefined,
})

const AuthProvider = ({
    serverProps: { initUser },
    children,
}: AuthProviderProps) => {
    const supabase = createClient()
    const [user, setUser] = useState<User | undefined | null>(initUser)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null)
            },
        )
        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    return useContext(AuthContext)
}

export default AuthProvider

// learned from: https://www.youtube.com/watch?v=05ZM4ymK9Nc
// and https://www.youtube.com/watch?v=hn-c0u2mDIQ
// and then of course, from supabase for the onAuthStateChange part
