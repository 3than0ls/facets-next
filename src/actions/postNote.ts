'use server'

import prisma from '@/utils/prisma/client'
import { createClient } from '@/utils/supabase/server'
import { Color } from '@prisma/client'

export default async function postNote(formData: FormData) {
    try {
        if (formData.get('title') === '' || formData.get('text') === '') {
            throw new Error('Empty data attribute error.')
        }

        // should probably do some more validation, but too lazy, not now... use zod for future
        // https://zod.dev/
        // if (!(formData.get('color')!.toString() in Color))

        // ensure logged in
        const supabase = await createClient()
        const { data, error } = await supabase.auth.getUser()
        if (error) {
            throw new Error(error.message)
        }

        const note = {
            title: formData.get('title') as string,
            text: formData.get('text') as string,
            positionX: parseInt(formData.get('positionX') as string),
            positionY: parseInt(formData.get('positionY') as string),
            color: formData.get('color') as Color,
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
