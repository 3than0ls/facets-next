'use client'

import { createClient } from '@/utils/supabase/client'
import usePostMessage from '@/utils/swr/postMessage'
import { User } from '@supabase/supabase-js'
import React, { useState, useEffect } from 'react'
import { TbSend } from 'react-icons/tb'
import HoverText from '../HoverText'
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
    const notSignedInEffect =
        user === null
            ? 'filter grayscale hover:cursor-not-allowed'
            : 'hover:border-accent focus:border-accent'

    const [message, setMessage] = useState('')

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
            autoComplete="off"
            onSubmit={sendMessage}
            className="flex flex-row h-24 w-full border-accent focus:outline-accent p-2"
        >
            <HoverText
                className="flex w-full h-full"
                enabled={!user}
                text="Log in to send messages"
            >
                <input
                    disabled={!user}
                    name="message"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setMessage(e.target.value)
                    }}
                    className={`${notSignedInEffect} bg-primary w-full h-full rounded-l-xl p-2 outline-none hover:outline-none border-2 border-transparent transition-colors duration-200`}
                />
                <button
                    disabled={!user}
                    type="submit"
                    className={`${notSignedInEffect} bg-accent h-full min-w-8 my-auto flex rounded-r-md`}
                >
                    <TbSend color="white" className="m-auto" />
                </button>
            </HoverText>
        </form>
    )
}

export default MessageBox
