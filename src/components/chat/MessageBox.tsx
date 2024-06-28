import React from 'react'
import { TbSend } from "react-icons/tb"

const MessageBox = () => {
    return (
        <div className="flex flex-row h-24 w-full border-accent focus:outline-accent p-2">
            <input className="bg-primary w-full h-full rounded-l-xl p-2 outline-none hover:outline-none border-2 border-transparent hover:border-accent focus:border-accent transition-colors duration-200" />
            <button type="button" className="bg-accent h-full min-w-8 my-auto flex rounded-r-md">
                <TbSend color="white" className="m-auto" />
            </button>
        </div>
    )
}

export default MessageBox