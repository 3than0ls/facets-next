import Chat from '@/components/chat/Chat'
import Stickyboard from '@/components/stickyboard/Stickyboard'

export default function Home() {
    return (
        <div
            className={`min-h-0 min-w-0 h-screen w-screen flex flex-row overflow-hidden`}
        >
            <Chat />
            <Stickyboard serverSideProps={{ serverNoteComponents: [] }} />
        </div>
    )
}
