'use client'

import { createClient } from '@/utils/supabase/client'

type AuthData = {
    username: string
    password: string
}

/**
 * Creates a new Supabase Auth user. Note that this itself does not create a Supabase public user (as seen in the Prisma schema).
 * That public user is created itself via a function trigger set on Supabase.
 * If this method seems unfavorable, you can also remove the function trigger and just create the auth user with supabase.auth
 * and create the public user with Prisma create or supabase.
 *
 * @param newUserData Username and password for new user
 * @returns User and session data from creating the user
 */
export async function createAccount(newUserData: AuthData) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
        email: `${newUserData.username}@supabase`,
        password: newUserData.password,
        options: {
            data: { username: newUserData.username },
        },
    })

    if (error) throw error

    return data
}

export const login = async (signInUserData: AuthData) => {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email: `${signInUserData.username}@supabase`,
        password: signInUserData.password,
    })

    if (error) throw error

    return data
}

export const logout = async () => {
    const supabase = createClient()

    await supabase.auth.signOut()
}
