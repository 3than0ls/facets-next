import React from 'react'

type MessagesLoadingScreenProps = {
    isLoading: boolean
}

/**
 * Literally only exists because there's no better solution to scrolling to the bottom before rendering. Without this, the user sees the messages load, and then the scrollbar jump to bottom. Not very nice!
 *
 * Things I've tried:
 *  - useLayoutEffect: doesn't work, no clue why
 *  - flex-col-reverse: breaks the radix scrollbar
 */
const MessagesLoadingScreen = ({ isLoading }: MessagesLoadingScreenProps) => {
    if (!isLoading) return null

    return (
        <div className="absolute bg-primary w-full h-full flex items-center justify-center">
            Insert loading animation here
        </div>
    )
}

export default MessagesLoadingScreen
