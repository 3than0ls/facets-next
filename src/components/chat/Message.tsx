import React from 'react'


type MessageProps = {
    message: string,
    from_self?: boolean
}

const Message = ({ message, from_self = false }: MessageProps) => {

    let from_self_style = from_self ? 'ml-6' : 'mr-6'

    return (
        <div className={`p-3 text-secondary bg-primary rounded-xl rounded-tl m-3 ${from_self_style}`}>{message}</div>
    )
}

export default Message