import React from 'react'

type MessageProps = {
    text: string
    selfAuthor?: boolean
}

const Message = ({ text, selfAuthor = false }: MessageProps) => {
    const selfAuthorStyle = selfAuthor
        ? 'rounded-br self-end ml-8'
        : 'rounded-bl self-start mr-8'

    return (
        <div
            className={`flex-grow-0 bg-primary text-black p-3 rounded-xl m-[6px] w-fit ${selfAuthorStyle}`}
        >
            {text}
        </div>
    )
}

export default Message
