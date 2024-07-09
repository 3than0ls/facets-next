'use client'
import * as HC from '@radix-ui/react-hover-card'
import React, { useState } from 'react'

type Props = {
    text: string
    className?: string
    inverseTheme?: boolean
    enabled?: boolean
    children: React.ReactNode
}

const HoverText = ({
    text,
    inverseTheme = false,
    enabled = true,
    className = '',
    children,
}: Props) => {
    const [open, setOpen] = useState(false)

    const theme = inverseTheme
        ? 'bg-white border-white border-2 text-accent fill-white'
        : 'bg-accent border-accent border-2 text-white fill-accent'

    return (
        <HC.Root
            openDelay={300}
            open={open}
            onOpenChange={(opened) => {
                setOpen(opened && enabled)
            }}
        >
            <HC.Trigger className={className}>{children}</HC.Trigger>
            <HC.Portal>
                <HC.Content side={'top'}>
                    <div
                        className={`shadow-lg ${theme} rounded-lg p-2 text-sm transition-all animate-hoverTextAnimation`}
                    >
                        {text}
                    </div>

                    <HC.Arrow
                        className={`${theme} bg-transparent border-none -translate-y-[1px]`}
                    />
                </HC.Content>
            </HC.Portal>
        </HC.Root>
    )
}

export default HoverText
