'use client'

import { CBFontClassName } from '@/fonts'
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
    noTranslate?: boolean
}

const Note = ({
    title,
    text,
    position,
    color,
    author,
    createdAt,
    linkToAuthor = true,
    noTranslate = false,
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
            className={`${noTranslate ? '' : 'absolute'} text-black p-3 ${bgColor} ${CBFontClassName} flex flex-col min-h-32 h-fit w-48 shadow-lg `}
            onMouseDown={stopPropagation}
            style={noTranslate ? {} : clientPosition}
        >
            <h1 className="text-3xl">{title}</h1>
            <p className="text-xl">{text}</p>
            <span className="flex-grow" />
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
