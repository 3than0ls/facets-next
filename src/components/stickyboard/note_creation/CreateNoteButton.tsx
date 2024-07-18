import { useAuth } from '@/context/AuthContext'
import { PJSFontClassName } from '@/fonts'
import React from 'react'
import { TbSquarePlus2 } from 'react-icons/tb'

type CreateNoteButtonProps = {
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const CreateNoteButton = ({ onClick }: CreateNoteButtonProps) => {
    const { user } = useAuth()

    // to prevent the dragging translation from applying
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }
    return (
        <div
            onClick={user ? onClick : () => {}}
            onMouseDown={stopPropagation}
            className={`${PJSFontClassName} p-5 absolute overflow-hidden top-6 right-6 w-16 h-16 ${user ? 'hover:cursor-pointer hover:w-48' : 'hover:cursor-not-allowed grayscale hover:w-64'} rounded-full group shadow-lg bg-primary flex flex-row-reverse gap-6 items-center transition-all duration-300`}
        >
            <div className="">
                <TbSquarePlus2 size={24} color="black" />
            </div>
            <div
                className={`text-nowrap mr-auto ${user ? 'text-lg' : 'text-sm'}`}
            >
                {user ? 'Create Note' : 'Log in to Create Note'}
            </div>
        </div>
    )
}

export default CreateNoteButton
