import React from 'react'
import Note from './Note'

const TooltipNotes = () => {
    return (
        <>
            <Note
                color="CYAN"
                author="Ethan Chennault"
                title="(1) How to Use"
                text="Drag around the grid to move around the stickyboard and view other people's notes."
                position={[60, 60]}
            />
            <Note
                color="ORANGE"
                author="Ethan Chennault"
                title="(2) How to Use"
                text="Log in or create an account to post your own messages in the chat or add your own notes."
                position={[260, 60]}
            />
            <Note
                color="YELLOW"
                author="Ethan Chennault"
                title="(3) How to Use"
                text="Right click on the grid to add your own note."
                position={[460, 60]}
            />
        </>
    )
}

export default TooltipNotes
