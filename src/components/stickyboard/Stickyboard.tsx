'use client'

import React from 'react'
import Note from './Note'
import GridBackground from './GridBackground'
import LocationMap from './LocationMap'
import TooltipNotes from './TooltipNotes'
import CreateNoteButton from './note_creation/CreateNoteButton'
import CreateNoteForm from './note_creation/CreateNoteForm'
import useStickyboardTracker from './hooks/useStickyboardTracker'
import useCreateNoteState, { CREATION_STATE } from './hooks/useCreateNoteState'
import { CBFontClassName } from '@/fonts'

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
        creationState,
        setCreationState,
        creatingPoint,
    } = useCreateNoteState(offset)

    const resetCreationState = () => {
        setCreationState(CREATION_STATE.NONE)
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
            className={`relative w-full h-full overflow-clip flex justify-center align-center ${CBFontClassName}`}
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
                        creationState === CREATION_STATE.PLACING
                            ? 'cursor-crosshair'
                            : 'cursor-grab active:cursor-grabbing'
                    }
                >
                    <GridBackground />
                </span>
                <span
                    className={
                        creationState === CREATION_STATE.PLACING
                            ? 'cursor-crosshair'
                            : ''
                    }
                >
                    {serverNoteComponents}
                    <TooltipNotes />
                    {creationState === CREATION_STATE.CREATING &&
                    creatingPoint ? (
                        <CreateNoteForm
                            initialPosition={creatingPoint}
                            resetCreationState={resetCreationState}
                        />
                    ) : null}
                </span>
            </div>
            <LocationMap offset={offset} tracking={tracking} />
            <CreateNoteButton onClick={createButtonClick} />
        </div>
    )
}

export default Stickyboard
