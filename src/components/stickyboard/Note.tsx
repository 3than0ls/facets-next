'use client'

import { Color } from '@prisma/client'
import React from 'react'

type NoteProps = {
    title?: string
    text?: string
    color: Color
    author?: string
    position: [number, number]
}

const Note = ({ title, text, color, author, position }: NoteProps) => {
    const bgColor = {
        CYAN: 'bg-cyan-300',
        ORANGE: 'bg-orange-300',
        YELLOW: 'bg-yellow-300',
        GREEN: 'bg-green-300',
        RED: 'bg-red-300',
    }[color]

    const transform: React.CSSProperties = {
        left: `${position[0]}px`,
        top: `${position[1]}px`,
    }

    // to prevent the dragging translation from applying when trying to select text on note
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    return (
        <div
            className={`absolute text-black p-3 ${bgColor} flex flex-col min-h-32 min-w-32 max-w-48 shadow-lg `}
            onMouseDown={stopPropagation}
            onMouseUp={stopPropagation}
            onMouseMove={stopPropagation}
            onMouseLeave={stopPropagation}
            style={transform}
        >
            <h1 className="text-3xl">{title}</h1>
            <p className="text-xl">{text}</p>
            <p className="text-md">{author}</p>
        </div>
    )
}

export default Note
