import React, { useContext, createContext, useState, useEffect } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase/client'

interface AuthProviderProps {
    children: React.ReactNode
}

type AuthContextType = {
    session: Session | null,
    user: User | null
}

const initState: AuthContextType = {
    session: null,
    user: null
}

const AuthContext = createContext<AuthContextType>(initState)

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(initState.user)
    const [session, setSession] = useState<Session | null>(initState.session)

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user || null)
        })

        const setData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession()
            if (error) {
                throw error
            }

            setSession(session)
            setUser(session?.user || null)
        }

        setData()

        return () => {
            listener?.subscription.unsubscribe()
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