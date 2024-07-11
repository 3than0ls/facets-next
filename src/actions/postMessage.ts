'use server'

import prisma from '@/utils/prisma/client'
import { createClient } from '@/utils/supabase/server'

export default async function postMessage(formData: FormData) {
    const text = formData.get('message')?.toString()

    // essentially the same condition, but explicitly state that if text is undefined/null or if text is an empty string, return error
    if (!text || text === '') {
        return { error: { message: 'Empty message text error.' } }
    }

    // ensure logged in
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) {
        return { error: error }
    }

    const message = {
        text: text,
        userId: data.user.id,
        // any other modifications
    }

    const res = await prisma.message.create({
        data: message,
    })

    return res
}
