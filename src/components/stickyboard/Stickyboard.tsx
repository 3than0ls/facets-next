'use client'

import React, { useRef, useState } from 'react'
import Note from './Note'
import GridBackground from './GridBackground'
import LocationMap from './LocationMap'

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
        - custom cursor
        - indicator/tooltip to suggest right clicking to create a note. perhaps a Note itself, with a new priority column to indicate placing it on top?
    */

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setTracking(true)
        originRef.current = {
            x: -offset.x + e.screenX,
            y: -offset.y + e.screenY,
        }
        // console.log(originRef.current)
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
            // console.log(offset)
        }
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
            className="relative w-full h-full overflow-clip flex justify-center align-center"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUpOrLeave}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUpOrLeave}
        >
            <div style={transformStyle} className="w-full h-full">
                <GridBackground />
                <Note
                    title="hello"
                    text="My name is Ethan Chennault"
                    color="cyan"
                    position={[80, 80]}
                />
            </div>
            <LocationMap
                gridSize={GRIDSIZE}
                offset={offset}
                tracking={tracking}
            />
        </div>
    )
}

export default Stickyboard
