'use server'

import prisma from '@/utils/prisma/client'
import { createClient } from '@/utils/supabase/server'
import { Color } from '@prisma/client'

type NewNoteData = {
    title: string
    text: string
    position: { x: number; y: number }
    color: Color
}

export default async function postNote(noteData: NewNoteData) {
    try {
        if (noteData.title === '' || noteData.text === '') {
            throw new Error('Empty data attribute error.')
        }

        // should probably do some more validation, but too lazy, not now... use zod for future
        // https://zod.dev/
        // if (!(noteData.color!.toString() in Color))

        // ensure logged in
        const supabase = await createClient()
        const { data, error } = await supabase.auth.getUser()
        if (error) {
            throw new Error(error.message)
        }

        const note = {
            title: noteData.title,
            text: noteData.text,
            positionX: noteData.position.x,
            positionY: noteData.position.y,
            color: noteData.color,
            userId: data.user.id,
        }

        const res = await prisma.note.create({
            data: note,
        })

        return res
    } catch (err: unknown) {
        return { error: (err as Error).message }
    }
}
