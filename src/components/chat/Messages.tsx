'use client'

import React, { useState, useEffect } from 'react'
import Message from './Message'
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

    const [messageComponents, setMessageComponents] = useState(
        serverMessageComponents,
    )

    const loadMore = async () => {
        const { data } = await supabase
            .from('Message')
            .select('*, User (username)')
            .order('sentAt', { ascending: false })
            .range(messageComponents.length, messageComponents.length + 50)

        const newMessages =
            data?.map((messageData) => (
                <Message
                    key={messageData.id}
                    text={messageData.text}
                    sentAt={new Date(messageData.sentAt)}
                    author={messageData.User.username}
                    selfAuthor={messageData.userId === user?.id}
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
                async (payload) => {
                    const { data } = await supabase
                        .from('User')
                        .select('username, id')
                        .eq('id', payload.new.userId)
                        .maybeSingle()

                    const newMessage = (
                        <Message
                            key={payload.new.id}
                            text={payload.new.text}
                            sentAt={new Date(payload.new.sentAt)}
                            author={data?.username ?? 'Unknown'}
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
