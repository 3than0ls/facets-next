import React from 'react'
import { default as NLink } from 'next/link'

type LinkProps = {
    href: string
    text: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    newTab?: boolean
    className?: string
}

const Link = ({
    href,
    text,
    onClick,
    newTab = false,
    className,
}: LinkProps) => {
    return (
        <>
            <NLink
                onClick={onClick}
                href={href}
                rel={newTab ? 'noopener noreferrer' : ''}
                target={newTab ? '_blank' : ''}
                className="group w-full transition-all  text-black"
            >
                <span
                    className={`${className} bg-left-bottom bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-[250ms] ease-in-out`}
                >
                    {text}
                </span>
            </NLink>
        </>
    )
}

export default Link
