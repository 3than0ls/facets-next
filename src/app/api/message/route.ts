import prisma from '@/utils/prisma/client'
import { createClient } from '@/utils/supabase/server'
import { PostMessageBody } from '@/utils/swr/postMessage'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const body: PostMessageBody = await req.json()
    if (body.text === '') {
        return NextResponse.json(
            { error: 'Empty message text error.' },
            { status: 400 },
        )
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 403 })
    }

    const message = {
        text: body.text,
        userId: data.user.id,
        // any other modifications
    }
    const res = await prisma.message.create({
        data: message,
    })

    console.log('data set!', res)

    return NextResponse.json(res)
}
