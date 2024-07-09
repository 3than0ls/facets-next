'use client'

import * as SA from '@radix-ui/react-scroll-area'

import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import Message from './Message'
import MessagesLoadingScreen from './MessagesLoadingScreen'

type MessagesProps = {
    serverProps: {
        serverMessageComponents: React.ReactElement<typeof Message>[]
    }
}

const Messages = ({
    serverProps: { serverMessageComponents },
}: MessagesProps) => {
    const [messageComponents, setMessageComponents] = useState([
        ...serverMessageComponents,
    ])
    const [loading, setLoading] = useState(true)

    const viewportRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        viewportRef.current?.scrollTo({
            behavior: 'auto',
            top: viewportRef.current.scrollHeight,
        })
    }

    useLayoutEffect(() => {
        // stupid useLayoutEffect won't work before rendering, probably cause of useRef. damnit.
        // EVENTUALLY TO BE REPLACED WITH https://www.npmjs.com/package/react-infinite-scroller
        scrollToBottom()
        setLoading(false)
    }, [])

    return (
        <SA.Root className="h-full overflow-auto">
            <SA.Viewport
                id="viewport"
                ref={viewportRef}
                className="h-full overflow-hidden w-full"
            >
                <MessagesLoadingScreen isLoading={loading} />
                {...messageComponents}
            </SA.Viewport>
            <SA.Scrollbar
                className="flex select-none touch-none transition-all w-[4px] mx-[2px] duration-[160ms] ease-out overflow-hidden"
                orientation="vertical"
            >
                <SA.Thumb className="flex-1 bg-accent rounded-md relative" />
            </SA.Scrollbar>
        </SA.Root>
    )
}

export default Messages
