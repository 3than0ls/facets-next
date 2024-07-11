'use client'

import React, { useContext, createContext, useState, useEffect } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

interface AuthProviderProps {
    children: React.ReactNode
}

type AuthContextType = {
    session: Session | undefined | null
    user: User | undefined | null
}

const AuthContext = createContext<AuthContextType>({
    session: undefined,
    user: undefined,
})

const AuthProvider = ({ children }: AuthProviderProps) => {
    const supabase = createClient()

    const [session, setSession] = useState<Session | undefined | null>(
        undefined,
    )
    const [user, setUser] = useState<User | undefined | null>(undefined)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session ?? null)
                setUser(session?.user ?? null)
            },
        )
        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ session, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    return useContext(AuthContext)
}

export default AuthProvider
