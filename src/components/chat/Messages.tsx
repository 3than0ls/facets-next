'use client'

import React, { useState, useEffect } from 'react'
import Message from './Message'
import ChatScroll from './ChatScroll'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { Message as MessageModel } from '@prisma/client'

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

    const [messageComponents, setMessageComponents] = useState(
        serverMessageComponents,
    )

    const loadMore = async () => {
        // const newMessage = <Message text="new inserted message" />
        const { data } = await supabase
            .from('Message')
            .select()
            .order('sentAt', { ascending: false })
            .range(messageComponents.length, messageComponents.length + 50)

        const newMessages =
            data?.map((row: MessageModel) => (
                <Message
                    text={row.text}
                    key={row.id}
                    selfAuthor={row.userId === user?.id}
                />
            )) ?? []

        setMessageComponents([...messageComponents, ...newMessages])
    }

    // https://www.youtube.com/watch?v=YR-xP6PPXXA
    useEffect(() => {
        const channel = supabase
            .channel('messages')
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
    }, [supabase, user, messageComponents])

    return (
        <ChatScroll className="w-full h-full overflow-auto" loadMore={loadMore}>
            {messageComponents}
        </ChatScroll>
    )
}

export default Messages
