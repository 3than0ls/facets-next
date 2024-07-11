'use client'

import React, { useEffect, useRef, useState } from 'react'
import { TbSend } from 'react-icons/tb'
import HoverText from '../HoverText'
import { useAuth } from '@/context/AuthContext'
import postMessage from '@/actions/postMessage'

type MessageBoxProps = {
    serverProps: {
        loggedIn: boolean
    }
}

const MessageBox = ({ serverProps: { loggedIn } }: MessageBoxProps) => {
    const { user } = useAuth()

    const [applyLoginEffects, setApplyLoginEffects] = useState(loggedIn)

    const loginEffects = applyLoginEffects
        ? 'hover:border-accent focus:border-accent'
        : 'filter grayscale hover:cursor-not-allowed'

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        setApplyLoginEffects(!!user)
    }, [user])

    // const postMessage = usePostMessage()

    const sendMessage = async (formData: FormData) => {
        // prefer quick and easy check to ensure that we don't spam server with invalid Post requests (empty message)
        if (!formData.get('message')) return

        // this should be handled client side by just preventing clicking
        if (!user) {
            throw new Error('Not signed in')
        }

        // should probably check if result OK or if any errors were returned
        // But assuming the user got this far validly, there will be no errors, nor a use for the response
        // If they haven't... well it's not my problem to deal with those edge case users
        await postMessage(formData)

        // clear message and unset pending
        formRef.current?.reset()
    }

    return (
        <form
            autoComplete="off"
            action={sendMessage}
            ref={formRef}
            className="flex flex-row h-24 w-full border-accent focus:outline-accent p-2"
        >
            <HoverText
                className="flex w-full h-full"
                enabled={!applyLoginEffects}
                text="Log in to send messages"
            >
                <input
                    disabled={!applyLoginEffects}
                    name="message"
                    className={`${loginEffects} bg-primary w-full h-full rounded-l-xl p-2 outline-none hover:outline-none border-2 border-transparent transition-colors duration-200`}
                />
                <button
                    disabled={!applyLoginEffects}
                    type="submit"
                    className={`${loginEffects} bg-accent h-full min-w-8 my-auto flex rounded-r-md`}
                >
                    <TbSend color="white" className="m-auto" />
                </button>
            </HoverText>
        </form>
    )
}

export default MessageBox
