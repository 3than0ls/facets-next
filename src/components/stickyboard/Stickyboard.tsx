'use client'

import React, { useRef, useState } from 'react'
import Note from './Note'
import GridBackground from './GridBackground'
import LocationMap from './LocationMap'
// eslint-disable-next-line camelcase
import { Caveat_Brush } from 'next/font/google'
import TooltipNotes from './TooltipNotes'

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
            className={`relative w-full h-full overflow-clip flex justify-center align-center ${font.className}`}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUpOrLeave}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUpOrLeave}
        >
            <div style={transformStyle} className="w-full h-full">
                <GridBackground />
                {serverNoteComponents}
                <TooltipNotes />
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
