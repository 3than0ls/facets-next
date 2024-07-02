import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(process.env.NEXT_PUBLIC_DATABASE_URL!, process.env.NEXT_PUBLIC_DATABASE_ANON_KEY!)

type CreateAccountData = {
    email: string,
    username: string,
    password: string
}

export async function createAccount(newUserData: CreateAccountData) {
    const { data, error } = await supabase.auth.signUp({
        email: newUserData.email,
        password: newUserData.password,
        options: {
            data: { username: newUserData.username }
        }
    })

    if (error)
        throw error

    console.log('created account with email', data?.user?.email)
}


type SignInData = {
    email: string,
    password: string
}

export const signIn = async (data: SignInData) => {
    await supabase.auth.signInWithPassword(data)
    console.log('signed in ', data.email)
}

export const signOut = async () => {
    await supabase.auth.signOut();
    console.log('signed out!')
}