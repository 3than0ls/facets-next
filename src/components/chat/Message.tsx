import React from 'react'

type MessageProps = {
    message: string
    selfAuthor?: boolean
}

const Message = ({ message, selfAuthor = false }: MessageProps) => {
    const selfAuthorStyle = selfAuthor ? 'ml-6' : 'mr-6'

    return (
        <div
            className={`p-3 text-secondary bg-primary rounded-xl rounded-tl m-3 ${selfAuthorStyle}`}
        >
            {message}
        </div>
    )
}

export default Message
