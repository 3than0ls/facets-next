'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TbRefresh } from 'react-icons/tb'

type ChatScrollProps = {
    loadMore: () => void
    className?: string
    threshold?: number
    children: React.ReactNode[]
}

const ChatScroll = ({
    loadMore,
    className,
    threshold = 5,
    children,
}: ChatScrollProps) => {
    const scrollIsAtThreshold = (element: HTMLDivElement) => {
        const value = Math.abs(
            -element.scrollTop + element.clientHeight - element.scrollHeight,
        )
        return value <= threshold
    }

    const [currentlyLoading, setCurrentlyLoading] = useState(false)

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (
            scrollIsAtThreshold(e.currentTarget) &&
            !currentlyLoading &&
            hasMore
        ) {
            setCurrentlyLoading(true)
            loadMore()
            // don't set loading to false yet, this is handle by the next section
        }
    }

    // solution that ensures that no more children will attempt to be loaded if loadMore no longer produces new children
    // does this by comparing previous children length to new children length after latest call of loadMore
    // all in all, this prevents users of ChatScroll to worry themselves about removing the onScroll functionality
    // theoretically, I could have hasMore and hasNoMore component as props, but that's beyond the scope of this
    const [hasMore, setHasMore] = useState(true)
    const prevLength = useRef(children.length)
    useEffect(() => {
        // only perform this check when currentlyLoading is true, which in this scenario means that loadMore has successfully executed (see handleScroll)
        if (!currentlyLoading) {
            return
        }

        // check if the previous length and new length are not the same. If they are the same, then loadMore has added nothing else and the lengths are the same
        if (prevLength.current !== children.length) {
            prevLength.current = children.length
        } else {
            setHasMore(false)
        }
        setCurrentlyLoading(false)
    }, [currentlyLoading])

    return (
        <div
            onScroll={hasMore ? handleScroll : undefined}
            className={`${className} flex flex-col-reverse [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-thumb]:rounded-full `}
        >
            {children}
            {currentlyLoading ? (
                <div className="p-4 flex items-center justify-center w-auto mx-2 bg-primary rounded-b-2xl animate-chatLoadingFade">
                    <TbRefresh className="stroke-accent w-10 h-10 animate-spin" />
                </div>
            ) : null}
            {!hasMore ? (
                <div className="p-4 flex items-center justify-center w-auto bg-primary animate-chatLoadingFade">
                    Congragulations! You've reached the top!
                </div>
            ) : null}
        </div>
    )
}

export default ChatScroll
