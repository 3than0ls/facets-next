import * as SA from '@radix-ui/react-scroll-area';

import React from 'react'
import Message from './Message';

const Messages = () => {
    let messages = []
    for (let i in Array.from({ length: 50 })) {
        messages.push(<Message key={i} from_self={parseInt(i) % 2 === 0} message={`Message ${i} testing testing testing testing testing testing testing`} />)
    }


    return (
        <SA.Root className="h-full overflow-auto">
            <SA.Viewport className="h-full overflow-hidden">
                {...messages}
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