import React, { useEffect, useRef } from 'react'
import { ACTIONS, useNoteReducer } from './noteFormReducer'
import { PJSFontClassName } from '@/fonts'
import { TbTrash } from 'react-icons/tb'
import { TbSquarePlus2 } from 'react-icons/tb'

type Point = {
    x: number
    y: number
}

type CreateNoteFormProps = {
    initialPosition: Point
    resetCreationState: () => void
}

const CreateNoteForm = ({
    initialPosition,
    resetCreationState,
}: CreateNoteFormProps) => {
    const bgColor = {
        CYAN: 'bg-cyan-300',
        ORANGE: 'bg-orange-300',
        YELLOW: 'bg-yellow-300',
        GREEN: 'bg-green-300',
        RED: 'bg-red-300',
    }['RED']

    // autofocus the contenteditable div (probably the title) on load
    const autoFocusRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        autoFocusRef.current?.focus()
    }, [autoFocusRef])

    const [state, dispatch] = useNoteReducer()

    const onTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
        dispatch({
            type: ACTIONS.UPDATE_TITLE,
            payload: e.currentTarget.textContent ?? 'not typed',
        })
    }

    const onTextChange = (e: React.FormEvent<HTMLDivElement>) => {
        dispatch({
            type: ACTIONS.UPDATE_TEXT,
            payload: e.currentTarget.textContent ?? 'not typed',
        })
    }
    /*
        TODO: manage all information with a form, no need for reducer, no need for live updates. server function when creating note is all we need
        add a visual indicator (pulsing borders?) that the note is not yet created
        create buttons on bottom to either delete or post note


        TIMELINE: 
        7/16 - Tuesday - Finish entirety of CreateNoteForm, including server action
        7/17 - Wednesday - Add realtime event channel to automatically update when notes are added
        7/18 - Thursday - Create /user/[id] page entirety
        7/19 - Friday - Create landing page
        7/20 - Saturday - Update README, package.json, etc., and create a "things I've learned" document
        7/21 - Sunday - Finishing Touches (add author to message) and Deploy
    */

    const clientPosition: React.CSSProperties = {
        left: `${initialPosition.x}px`,
        top: `${initialPosition.y}px`,
    }

    // to prevent the dragging translation from applying
    const stopPropagation = (e: React.MouseEvent<HTMLFormElement>) => {
        e.stopPropagation()
    }
    return (
        <form
            style={clientPosition}
            onMouseDown={stopPropagation}
            className={`absolute text-black p-3 ${bgColor} flex flex-col min-h-32 w-48 shadow-lg `}
        >
            <div
                ref={autoFocusRef}
                contentEditable
                suppressContentEditableWarning
                onInput={onTitleChange}
                className={`text-3xl outline-none text-black bg-left-bottom bg-gradient-to-r ${state.titleError ? 'from-red-600 to-red-600' : 'from-black to-black'}  bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] focus:bg-[length:100%_2px] transition-all duration-200 ease-in-out`}
            >
                Your wonderful thoughts
            </div>
            {state.titleError ? (
                <span className={`${PJSFontClassName} text-red-600`}>
                    {state.titleError}
                </span>
            ) : null}
            <div
                contentEditable
                suppressContentEditableWarning
                onInput={onTextChange}
                className={`text-xl outline-none text-black bg-left-bottom bg-gradient-to-r ${state.textError ? 'from-red-600 to-red-600' : 'from-black to-black'} bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] focus:bg-[length:100%_2px] transition-all duration-200 ease-in-out`}
            >
                My message...
            </div>
            {state.textError ? (
                <span className={`${PJSFontClassName} text-red-600`}>
                    {state.textError}
                </span>
            ) : null}
            <div className={`flex ${PJSFontClassName} text-md mt-4`}>
                <TbTrash
                    title="Delete Note"
                    size={22}
                    className="hover:cursor-pointer "
                    color="black"
                    onClick={resetCreationState}
                />
                <TbSquarePlus2
                    title="Post Note"
                    size={22}
                    className={`${
                        !state.titleError && !state.textError
                            ? 'hover:cursor-pointer '
                            : 'hover:cursor-not-allowed'
                    } ml-auto`}
                    color="black"
                    onClick={resetCreationState}
                />
            </div>
        </form>
    )
}

export default CreateNoteForm
