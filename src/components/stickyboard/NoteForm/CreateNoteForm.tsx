import React from 'react'

type Point = {
    x: number
    y: number
}

type CreateNoteFormProps = {
    initialPosition: Point
}

const CreateNoteForm = ({ initialPosition }: CreateNoteFormProps) => {
    const bgColor = {
        CYAN: 'bg-cyan-300',
        ORANGE: 'bg-orange-300',
        YELLOW: 'bg-yellow-300',
        GREEN: 'bg-green-300',
        RED: 'bg-red-300',
    }['RED']
    /*
        TODO: manage all information with a form, no need for reducer, no need for live updates. server function when creating note is all we need
        add a visual indicator (pulsing borders?) that the note is not yet created
        create buttons on bottom to either delete or post note
    */

    const clientPosition: React.CSSProperties = {
        left: `${initialPosition.x}px`,
        top: `${initialPosition.y}px`,
    }

    // to prevent the dragging translation from applying
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }
    return (
        <div
            style={clientPosition}
            onMouseDown={stopPropagation}
            className={`absolute text-black p-3 ${bgColor} flex flex-col min-h-32 w-48 shadow-lg `}
        >
            <h1 className="text-3xl">title</h1>
            <p className="text-xl">text</p>
            author submit
        </div>
    )
}

export default CreateNoteForm
