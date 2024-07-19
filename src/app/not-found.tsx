import React from 'react'
import Note from '@/components/stickyboard/Note'

function NotFound() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <span className="transform scale-[170%] shadow-xl">
                <Note
                    title="404 Error"
                    text="Uh oh... Page not found! How'd you get here?"
                    author="Ethan Chennault"
                    color="ORANGE"
                    position={[0, 0]}
                    noTranslate
                    linkToAuthor={false}
                />
            </span>
        </div>
    )
}

export default NotFound
