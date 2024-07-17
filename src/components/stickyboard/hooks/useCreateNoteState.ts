import { useRef, useState } from 'react'

type Point = {
    x: number
    y: number
}

export const enum CREATION_STATE {
    NONE,
    PLACING,
    CREATING,
}

type Vector = Point

/**
 * Seperates a lot of the logic of how the creating a note works from Stickyboard.tsx.
 *
 * @param {Vector} offset - The offset from the stickyboard tracker
 *
 * @returns {React.RefObject<HTMLDivElement>} stickyboardRef - Ref to the stickyboard parent. Must be the same element that you add the event handler for `setCreatingPointIfPlacing`.
 * @returns {boolean} isPlacing - Whether or not you are in the state of currently placing a new note or not.
 * @returns {Point | null} creatingPoint - If placing, this is the point where you click. If not placing, this is null.
 * @returns {function} setCreatingPointIfPlacing - Callback function that sets the creation point, usually on mouse click. Must be the same element you add the ref for `stickboardRef`.
 * @returns {function} createButtonClick - Callback function that sets placing to true, usually on mouse click of the create note button.
 */
export default function useCreateNoteState(offset: Vector) {
    const stickyboardRef = useRef<HTMLDivElement>(null)
    const [creationState, setCreationState] = useState<CREATION_STATE>(
        CREATION_STATE.NONE,
    )
    const [creatingPoint, setCreatingPoint] = useState<Point | null>(null)

    const createButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setCreationState(CREATION_STATE.PLACING)
        e.stopPropagation()
    }

    const setCreatingPointIfPlacing = (e: React.MouseEvent<HTMLDivElement>) => {
        if (creationState === CREATION_STATE.PLACING) {
            setCreatingPoint({
                x: e.clientX - offset.x - stickyboardRef.current!.offsetLeft, // this bang operator solely relies on the fact that the ref is loaded before event handlers are
                y: e.clientY - offset.y - stickyboardRef.current!.offsetTop, // which is something I'm not 100% confident in. However, by the time a typical user clicks it, it wil be loaded
            })
            setCreationState(CREATION_STATE.CREATING)
        }
    }

    return {
        stickyboardRef,
        creationState,
        setCreationState,
        creatingPoint,
        setCreatingPointIfPlacing,
        createButtonClick,
    }
}
