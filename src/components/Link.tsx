import React from 'react'
import { default as NLink } from 'next/link'

type LinkProps = {
    href: string
    text: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    colorTheme?: 'black' | 'white'
}

const Link = ({ href, text, onClick, colorTheme = 'black' }: LinkProps) => {
    const color = {
        black: 'text-black from-black to-black',
        white: 'text-white from-white to-white',
    }[colorTheme]

    return (
        <div>
            <NLink
                onClick={onClick}
                href={href}
                className="group w-full transition-all"
            >
                <span
                    className={`bg-left-bottom bg-gradient-to-r ${color} bg-[length:0%_1px] bg-no-repeat group-hover:bg-[length:100%_1px] transition-all duration-[250ms] ease-in-out`}
                >
                    {text}
                </span>
            </NLink>
        </div>
    )
}

export default Link
