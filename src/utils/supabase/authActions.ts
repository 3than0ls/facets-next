'use server'
import { createClient } from '@/utils/supabase/server'


type AuthData = {
    username: string,
    password: string
}

export async function createAccount(newUserData: AuthData) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
        email: `${newUserData.username}@supabase`,
        password: newUserData.password,
        options: {
            data: { username: newUserData.username }
        }
    })

    if (error)
        throw error

    return data
}


export const login = async (signInUserData: AuthData) => {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email: `${signInUserData.username}@supabase`,
        password: signInUserData.password,
    })

    if (error)
        throw error

    return data
}

export const logout = async () => {
    const supabase = await createClient()

    await supabase.auth.signOut();
    console.log('signed out!')
}