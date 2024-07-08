'use client'

import { createClient } from '@/utils/supabase/client'
import usePostMessage from '@/utils/swr/postMessage'
import { User } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { TbSend } from 'react-icons/tb'
const supabase = createClient()

const MessageBox = () => {
    const [user, setUser] = useState<User | null | undefined>(undefined)

    supabase.auth.onAuthStateChange((event, session) => {
        // Update user if any auth state change occurs (login logout)
        setUser(session?.user ?? null)
    })

    const [message, setMessage] = useState('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const postMessage = usePostMessage()

    const sendMessage = async () => {
        // this should be handled client side by just preventing clicking
        if (!user) {
            throw new Error('Not signed in')
        }

        const result = await postMessage({ text: message })

        console.log(result)
    }

    return (
        <div className="flex flex-row h-24 w-full border-accent focus:outline-accent p-2">
            <input
                onChange={onChange}
                className="bg-primary w-full h-full rounded-l-xl p-2 outline-none hover:outline-none border-2 border-transparent hover:border-accent focus:border-accent transition-colors duration-200"
            />
            <button
                type="button"
                onClick={sendMessage}
                className="bg-accent h-full min-w-8 my-auto flex rounded-r-md"
            >
                <TbSend color="white" className="m-auto" />
            </button>
        </div>
    )
}

export default MessageBox
