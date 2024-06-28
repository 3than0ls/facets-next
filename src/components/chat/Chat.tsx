import React from 'react'
import Message from './Message'
import Messages from './Messages'
import MessageBox from './MessageBox'

const Chat = () => {
    return (
        <div className="min-h-0 h-full flex flex-col min-w-[400px] w-1/4 border-r-4 border-gray-100 bg-white">
            <Messages />
            <MessageBox />
        </div>
    )
}

export default Chat