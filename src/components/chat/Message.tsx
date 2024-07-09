import React from 'react'

type MessageProps = {
    text: string
    selfAuthor?: boolean
}

const Message = ({ text, selfAuthor = false }: MessageProps) => {
    const selfAuthorStyle = selfAuthor
        ? 'ml-12 bg-primary text-secondary rounded-br'
        : 'mr-12 bg-primary text-secondary rounded-bl'

    return (
        <div className={`p-3 rounded-xl m-[10px]  ${selfAuthorStyle}`}>
            {text}
        </div>
    )
}

export default Message
