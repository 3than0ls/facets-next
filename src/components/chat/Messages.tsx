'use client'

import React, { useState, useEffect } from 'react'
import Message from './Message'
import { User } from '@supabase/supabase-js'
import ChatScroll from './ChatScroll'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/context/AuthContext'

type MessagesProps = {
    serverProps: {
        serverMessageComponents: React.ReactElement<typeof Message>[]
    }
}

const Messages = ({
    serverProps: { serverMessageComponents },
}: MessagesProps) => {
    const supabase = createClient()

    const { user } = useAuth()

    const [messageComponents, setMessageComponents] = useState([
        ...serverMessageComponents,
    ])

    const loadMore = () => {
        const newMessage = <Message text="new inserted message" />
        setMessageComponents([...messageComponents, newMessage].slice(0, 50))
        console.log('fetching more data', serverMessageComponents.length)
    }

    // https://www.youtube.com/watch?v=YR-xP6PPXXA
    useEffect(() => {
        const channel = supabase
            .channel('supabase_realtime')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'Message',
                },
                (payload) => {
                    const newMessage = (
                        <Message
                            key={payload.new.id}
                            text={payload.new.text}
                            selfAuthor={payload.new.userId === user?.id}
                        />
                    )
                    setMessageComponents([newMessage, ...messageComponents])
                },
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, user])

    return (
        <ChatScroll className="w-full h-full overflow-auto" loadMore={loadMore}>
            {...messageComponents}
        </ChatScroll>
    )
}

export default Messages
