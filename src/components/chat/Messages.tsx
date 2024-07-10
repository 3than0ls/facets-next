'use client'

import React, { useState } from 'react'
import Message from './Message'
import ChatScroll from './ChatScroll'

type MessagesProps = {
    serverProps: {
        serverMessageComponents: React.ReactElement<typeof Message>[]
    }
}

const Messages = ({
    serverProps: { serverMessageComponents },
}: MessagesProps) => {
    const [messageComponents, setMessageComponents] = useState([
        ...serverMessageComponents,
    ])

    const loadMore = () => {
        const newMessage = <Message text="new inserted message" />
        setMessageComponents([...messageComponents, newMessage].slice(0, 50))
        console.log('fetching more data', serverMessageComponents.length)
    }

    return (
        <ChatScroll className="w-full h-full overflow-auto" loadMore={loadMore}>
            {...messageComponents}
        </ChatScroll>
    )
}

export default Messages
