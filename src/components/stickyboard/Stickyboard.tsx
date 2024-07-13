'use client'

import React, { useRef, useState } from 'react'
import Note from './Note'
import GridBackground from './GridBackground'

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

const Stickyboard = ({
    serverSideProps: { serverNoteComponents },
}: StickyboardProps) => {
    const trackingRef = useRef(false)
    const originRef = useRef<Point>({ x: 0, y: 0 })
    const [offset, setOffset] = useState<Vector>({ x: 0, y: 0 })

    /* TODO: 
        - have some sort of absolutely-positioned position indicator 
        - custom cursor
        - indicator/tooltip to suggest right clicking to create a note. perhaps a Note itself, with a new priority column to indicate placing it on top?
        - prevent client from translating too far in any direction (grid size)
    */

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        trackingRef.current = true
        originRef.current = {
            x: -offset.x + e.screenX,
            y: -offset.y + e.screenY,
        }
        // console.log(originRef.current)
        e.preventDefault()
    }

    const onMouseUpOrLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        trackingRef.current = false
    }

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (trackingRef.current) {
            console.log(
                offset.x + e.screenX - originRef.current.x,
                offset.y + e.screenX - originRef.current.x,
            )
            setOffset({
                x: e.screenX - originRef.current.x,
                y: e.screenY - originRef.current.y,
            })
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
        </div>
    )
}

export default Stickyboard
