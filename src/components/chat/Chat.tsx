import React from 'react'
import Messages from './Messages'
import MessageBox from './MessageBox'
import Message from './Message'
import { createClient } from '@/utils/supabase/server'
import prisma from '@/utils/prisma/client'

const Chat = async () => {
    // get posts on server on initial load, give them as props to Messages, and have Messages be client side to subscribe to new messages
    const supabase = await createClient()

    const { data } = await supabase.auth.getUser()

    const serverMessageData = await prisma.message.findMany({
        take: 50,
        orderBy: {
            sentAt: 'desc', // ordered by descending, that way newest messages are first
        },
        include: {
            User: true,
        },
    })

    const messageComponents = []
    for (const messageData of serverMessageData) {
        messageComponents.push(
            <Message
                key={messageData.id}
                sentAt={messageData.sentAt}
                author={messageData.User?.username ?? 'Unknown'}
                selfAuthor={
                    data.user ? data.user.id === messageData.userId : false
                }
                text={messageData.text}
            />,
        )
    }

    return (
        <div className="min-h-0 h-full flex flex-col items-center justify-center min-w-[400px] w-1/4 border-r-4 border-border bg-white">
            <Messages
                serverProps={{ serverMessageComponents: messageComponents }}
            />
            <MessageBox />
        </div>
    )
}

export default Chat
