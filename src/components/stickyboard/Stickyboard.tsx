'use client'

import React from 'react'
import Note from './Note'
import GridBackground from './GridBackground'
import LocationMap from './LocationMap'
// eslint-disable-next-line camelcase
import { Caveat_Brush } from 'next/font/google'
import TooltipNotes from './TooltipNotes'
import CreateNoteButton from './note_creation/CreateNoteButton'
import CreateNoteForm from './note_creation/CreateNoteForm'
import useStickyboardTracker from './hooks/useStickyboardTracker'
import useCreateNoteState from './hooks/useCreateNoteState'

const font = Caveat_Brush({
    subsets: ['latin'],
    weight: '400',
})

type StickyboardProps = {
    serverSideProps: {
        serverNoteComponents: React.ReactElement<typeof Note>[]
    }
}

const Stickyboard = ({
    serverSideProps: { serverNoteComponents },
}: StickyboardProps) => {
    const { tracking, offset, trackMotion, startTracking, stopTracking } =
        useStickyboardTracker()

    const {
        createButtonClick,
        setCreatingPointIfPlacing,
        stickyboardRef,
        isPlacing,
        creatingPoint,
    } = useCreateNoteState(offset)

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
            onMouseDown={startTracking}
            onMouseUp={stopTracking}
            onMouseMove={trackMotion}
            onMouseLeave={stopTracking}
            ref={stickyboardRef}
            onClick={setCreatingPointIfPlacing}
        >
            <div style={transformStyle} className="w-full h-full">
                <span
                    className={
                        isPlacing
                            ? 'cursor-crosshair'
                            : 'cursor-grab active:cursor-grabbing'
                    }
                >
                    <GridBackground />
                </span>
                <span className={isPlacing ? 'cursor-crosshair' : ''}>
                    {serverNoteComponents}
                    <TooltipNotes />
                    {creatingPoint ? (
                        <CreateNoteForm initialPosition={creatingPoint} />
                    ) : null}
                </span>
            </div>
            <LocationMap offset={offset} tracking={tracking} />
            <CreateNoteButton onClick={createButtonClick} />
        </div>
    )
}

export default Stickyboard
