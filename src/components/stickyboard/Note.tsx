import React from 'react'

type NoteProps = {
    title?: string
    text?: string
    color: 'cyan' | 'orange' | 'yellow' | 'green' | 'red'
    author?: string
    position: [number, number]
}

const Note = ({ title, text, color, author, position }: NoteProps) => {
    const bgColor = {
        cyan: 'bg-cyan-300',
        orange: 'bg-orange-300',
        yellow: 'bg-yellow-300',
        green: 'bg-green-300',
        red: 'bg-red-300',
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
            className={`relative text-black p-2 ${bgColor} flex flex-col min-h-32 min-w-32 max-w-48 shadow-lg `}
            onMouseDown={stopPropagation}
            onMouseUp={stopPropagation}
            onMouseMove={stopPropagation}
            onMouseLeave={stopPropagation}
            style={transform}
        >
            <h1 className="text-3xl">{title}</h1>
            <p className="text-xl">{text}</p>
        </div>
    )
}

export default Note
