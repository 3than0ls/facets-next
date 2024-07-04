import React from 'react'

type NoteProps = {
    title?: string,
    text?: string,
    color: "cyan" | "orange" | "yellow" | "green" | "red",
    author?: string
    position: [number, number]
}


const Note = ({ title, text, color, author, position }: NoteProps) => {
    const bgColor = {
        cyan: "bg-cyan-300",
        orange: "bg-orange-300",
        yellow: "bg-yellow-300",
        green: "bg-green-300",
        red: "bg-red-300"
    }[color]

    const transform: React.CSSProperties = {
        left: `${position[0]}px`,
        top: `${position[1]}px`
    }

    return (
        <div className={`relative text-secondary p-2 ${bgColor} flex flex-col h-32 w-32`} style={transform}>
            <h1>{title}</h1>
            <p className="text-secondary">{text}</p>
        </div>
    )
}

export default Note