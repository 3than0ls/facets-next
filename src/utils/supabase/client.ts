import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(process.env.NEXT_PUBLIC_DATABASE_URL!, process.env.NEXT_PUBLIC_DATABASE_ANON_KEY!)

type AuthData = {
    username: string,
    password: string
}

export async function createAccount(newUserData: AuthData) {
    const { data, error } = await supabase.auth.signUp({
        email: `${newUserData.username}@supabase`,
        password: newUserData.password,
        options: {
            data: { username: newUserData.username }
        }
    })

    if (error)
        throw error

    console.log('created account with email', data?.user?.email)
}


export const signIn = async (signInUserData: AuthData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: `${signInUserData.username}@supabase`,
        password: signInUserData.password,
    })

    if (error)
        throw error

    console.log('signed in ', data?.user?.email)
}

export const signOut = async () => {
    await supabase.auth.signOut();
    console.log('signed out!')
}