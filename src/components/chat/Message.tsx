import React from 'react'

type MessageProps = {
    text: string
    sentAt: Date
    author: string
    selfAuthor?: boolean
}

const Message = ({
    text,
    sentAt,
    author,
    selfAuthor = false,
}: MessageProps) => {
    const selfAuthorStyle = selfAuthor
        ? 'rounded-br self-end ml-8'
        : 'rounded-bl self-start mr-8'

    const shortenedAuthor =
        author.length > 18 ? author.substring(0, 18 - 3) + '...' : author

    return (
        <div
            className={`flex-grow-0 bg-primary w-fit text-black p-3 rounded-xl m-[6px] ${selfAuthorStyle}`}
        >
            {text}
            <p
                className={`text-xs font-sans text-gray-600 mt-1 ${selfAuthor ? 'text-right' : 'text-left'}`}
            >
                {sentAt?.toLocaleDateString()}
                {sentAt ? ' - ' : ''}
                <a href={`/user/${author}`} className="underline">
                    {shortenedAuthor}
                </a>
            </p>
        </div>
    )
}

export default Message
