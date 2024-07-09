'use client'

import { createClient } from '@/utils/supabase/client'
import usePostMessage from '@/utils/swr/postMessage'
import { User } from '@supabase/supabase-js'
import React, { useState, useEffect } from 'react'
import { TbSend } from 'react-icons/tb'
const supabase = createClient()

const MessageBox = () => {
    const [user, setUser] = useState<User | null | undefined>(undefined)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null)
            },
        )
        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    const [message, setMessage] = useState('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const postMessage = usePostMessage()

    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()

        // this should be handled client side by just preventing clicking
        if (!user) {
            throw new Error('Not signed in')
        }

        const result = await postMessage({ text: message })

        // should probably check if result OK
        setMessage('')
    }

    return (
        <form
            onSubmit={sendMessage}
            className="flex flex-row h-24 w-full border-accent focus:outline-accent p-2"
        >
            <input
                name="message"
                value={message}
                onChange={onChange}
                className="bg-primary w-full h-full rounded-l-xl p-2 outline-none hover:outline-none border-2 border-transparent hover:border-accent focus:border-accent transition-colors duration-200"
            />
            <button
                type="submit"
                className="bg-accent h-full min-w-8 my-auto flex rounded-r-md"
            >
                <TbSend color="white" className="m-auto" />
            </button>
        </form>
    )
}

export default MessageBox
