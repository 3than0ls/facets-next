import Chat from '@/components/chat/Chat'
import Note from '@/components/stickyboard/Note'
import Stickyboard from '@/components/stickyboard/Stickyboard'
import prisma from '@/utils/prisma/client'
import { Note as NoteModel } from '@prisma/client'

export default async function Home() {
    const notes = await prisma.note.findMany()
    const noteComponents = await Promise.all(
        notes.map(async (note: NoteModel) => {
            const user = await prisma.user.findUnique({
                where: {
                    id: note.userId,
                },
            })

            return (
                <Note
                    title={note.title}
                    text={note.text}
                    color={note.color}
                    createdAt={note.createdAt}
                    position={[note.positionX, note.positionY]}
                    author={user?.username ?? 'Unknown'}
                />
            )
        }),
    )

    return (
        <div
            className={`min-h-0 min-w-0 h-screen w-screen flex flex-row overflow-hidden`}
        >
            <Chat />
            <Stickyboard
                serverSideProps={{ serverNoteComponents: noteComponents }}
            />
        </div>
    )
}
