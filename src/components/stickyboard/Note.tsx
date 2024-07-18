'use client'

import { Color } from '@prisma/client'
import React from 'react'

type NoteProps = {
    title: string
    text: string
    position: [number, number]
    color: Color
    author: string
    createdAt?: Date
    linkToAuthor?: boolean
}

const Note = ({
    title,
    text,
    position,
    color,
    author,
    createdAt,
    linkToAuthor = true,
}: NoteProps) => {
    const bgColor = {
        CYAN: 'bg-cyan-300',
        ORANGE: 'bg-orange-300',
        YELLOW: 'bg-yellow-300',
        GREEN: 'bg-green-300',
        RED: 'bg-red-300',
    }[color]

    const clientPosition: React.CSSProperties = {
        left: `${position[0]}px`,
        top: `${position[1]}px`,
    }

    // to prevent the dragging translation from applying when trying to select text on note
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    const shortenedAuthor =
        author.length > 18 ? author.substring(0, 18 - 3) + '...' : author

    return (
        <div
            className={`absolute text-black p-3 ${bgColor} flex flex-col min-h-32 w-48 shadow-lg `}
            onMouseDown={stopPropagation}
            style={clientPosition}
        >
            <h1 className="text-3xl">{title}</h1>
            <p className="text-xl">{text}</p>
            <p className="text-xs font-sans text-gray-600 text-right mt-2">
                {createdAt?.toLocaleDateString()}
                {createdAt ? ' - ' : ''}
                {linkToAuthor ? (
                    <a href={`/user/${author}`} className="underline">
                        {shortenedAuthor}
                    </a>
                ) : (
                    shortenedAuthor
                )}
            </p>
        </div>
    )
}

export default Note
