'use client'

import React, { useRef, useState } from 'react'
import Note from './Note'
import GridBackground from './GridBackground'
import LocationMap from './LocationMap'
// eslint-disable-next-line camelcase
import { Caveat_Brush } from 'next/font/google'
import TooltipNotes from './TooltipNotes'
import CreateNote from './CreateNote'
import CreateNoteForm from './NoteForm/CreateNoteForm'

const font = Caveat_Brush({
    subsets: ['latin'],
    weight: '400',
})

type StickyboardProps = {
    serverSideProps: {
        serverNoteComponents: React.ReactElement<typeof Note>[]
    }
}

type Point = {
    x: number
    y: number
}

type Vector = Point

const GRIDSIZE = 10_000

/**
 * The grid size is a constant 100,000 pixels (set here and set in tailwind.config.js)
 *
 * @param p Input point
 * @returns New point bound within the limits
 */
const bindInLimits = (p: Point) => {
    p.x = Math.max(-GRIDSIZE / 2 + 250, Math.min(p.x, GRIDSIZE / 2 + 250))
    p.y = Math.max(-GRIDSIZE / 2 + 250, Math.min(p.y, GRIDSIZE / 2 + 250))
    return p
}

const Stickyboard = ({
    serverSideProps: { serverNoteComponents },
}: StickyboardProps) => {
    const [tracking, setTracking] = useState(false)
    const originRef = useRef<Point>({ x: 0, y: 0 })
    const [offset, setOffset] = useState<Vector>({ x: 0, y: 0 })

    /* TODO: 
        - no longer right click ot create rather a draggable plus button that opens into a note creation menu when opened
        - create button on top right, just a simple shadowed circle with a plus icon
        - create a facets logo
    */

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setTracking(true)
        originRef.current = {
            x: -offset.x + e.screenX,
            y: -offset.y + e.screenY,
        }
        e.preventDefault()
    }

    const onMouseUpOrLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        setTracking(false)
    }

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (tracking) {
            setOffset(
                bindInLimits({
                    x: e.screenX - originRef.current.x,
                    y: e.screenY - originRef.current.y,
                }),
            )
        }
    }

    // functionality having to do with creation
    const boardRef = useRef<HTMLDivElement>(null)
    const [creating, setCreating] = useState(false)
    const [creatingPoint, setCreatingPoint] = useState<Point | null>(null)

    const onCreateClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setCreating(true)
        e.stopPropagation()
    }

    const onCreatePlace = (e: React.MouseEvent<HTMLDivElement>) => {
        if (creating) {
            setCreatingPoint({
                x: e.clientX - boardRef.current!.offsetLeft, // this bang operator solely relies on the fact that the ref is loaded before event handlers are
                y: e.clientY - boardRef.current!.offsetTop, // which is something I'm not 100% confident in. However, by the time a typical user clicks it, it wil be loaded
            })
        }
        setCreating(false)
        // setCreatingPoint(null)
    }

    const transformStyle: React.CSSProperties = {
        transform: `translate(${offset.x}px, ${offset.y}px)`,
    }

    /* this looks like HTML/React clutter, but I swear each has a purpose:
        <outer div>: facilitates event detection, provides width and height baselines
            <inner div>: translation div, all children are translated here. Relative positioning.
                <GridBackground>: Absolute positioning, behind the List of notes
                <Notes>[]: Absolute positioning.
    */
    return (
        <div
            ref={boardRef}
            className={`relative w-full h-full overflow-clip flex justify-center align-center ${font.className}`}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUpOrLeave}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUpOrLeave}
            onClick={onCreatePlace}
        >
            <div style={transformStyle} className="w-full h-full">
                <span
                    className={
                        creating
                            ? 'cursor-crosshair'
                            : 'cursor-grab active:cursor-grabbing'
                    }
                >
                    <GridBackground />
                </span>
                <span className={creating ? 'cursor-crosshair' : ''}>
                    {serverNoteComponents}
                    <TooltipNotes />
                    {creatingPoint ? (
                        <CreateNoteForm initialPosition={creatingPoint} />
                    ) : null}
                </span>
            </div>
            <LocationMap
                gridSize={GRIDSIZE}
                offset={offset}
                tracking={tracking}
            />
            <CreateNote onClick={onCreateClick} />
        </div>
    )
}

export default Stickyboard
