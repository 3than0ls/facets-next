import Note from '@/components/stickyboard/Note'
import { PJSFontClassName } from '@/fonts'
import prisma from '@/utils/prisma/client'

type Params = {
    params: {
        username: string
    }
}

export default async function Home({ params: { username } }: Params) {
    const userNotes = await prisma.user.findUnique({
        where: {
            username,
        },
        include: {
            notes: {
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    })

    const noteComponents = userNotes?.notes.map((note) => {
        return (
            <Note
                key={note.id}
                title={note.title}
                text={note.text}
                author={username}
                color={note.color}
                createdAt={note.createdAt}
                position={[0, 0]}
                noTranslate
            />
        )
    })

    return (
        <div className="w-full h-full p-12 flex flex-col gap-4 bg-image bg-fixed bg-cover bg-center">
            <span className="flex items-end w-fit gap-4 border-b-2 border-accent">
                <span className="">User:</span>
                <h1 className="text-5xl">{username}</h1>
            </span>
            <h3 className="text-3xl mt-4">{username}'s Notes</h3>

            <div
                className={`flex flex-row flex-wrap gap-10  relative transform-none`}
            >
                {noteComponents
                    ? noteComponents
                    : `${username} doesn't appear to have any notes.`}
            </div>
        </div>
    )
}
