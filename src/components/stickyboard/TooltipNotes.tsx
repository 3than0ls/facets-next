import React from 'react'
import Note from './Note'

const TooltipNotes = () => {
    return (
        <>
            <Note
                color="CYAN"
                author="Ethan Chennault"
                title="(1) How to Use"
                text="Drag to move around the stickyboard and view other people's notes."
                position={[60, 60]}
                linkToAuthor={false}
            />
            <Note
                color="ORANGE"
                author="Ethan Chennault"
                title="(2) How to Use"
                text="Log in or create an account to send your own messages in the chat or post your own notes."
                position={[260, 60]}
                linkToAuthor={false}
            />
            <Note
                color="YELLOW"
                author="Ethan Chennault"
                title="(3) How to Use"
                text="Once logged in, click the button on the top right to create your own notes!"
                position={[460, 60]}
                linkToAuthor={false}
            />
        </>
    )
}

export default TooltipNotes
