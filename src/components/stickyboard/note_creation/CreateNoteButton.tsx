import React from 'react'
import { TbSquarePlus2 } from 'react-icons/tb'
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from 'next/font/google'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

type CreateNoteButtonProps = {
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const CreateNoteButton = ({ onClick }: CreateNoteButtonProps) => {
    // to prevent the dragging translation from applying
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }
    return (
        <div
            onClick={onClick}
            onMouseDown={stopPropagation}
            className={`${font.className} p-5 absolute overflow-hidden top-6 right-6 w-16 h-16 hover:cursor-pointer hover:w-48 rounded-full group shadow-lg bg-primary flex flex-row-reverse items-center gap-6 transition-all duration-300`}
        >
            <div className="">
                <TbSquarePlus2 size={24} color="black" />
            </div>
            <div className="text-nowrap text-lg">Create Note</div>
        </div>
    )
}

export default CreateNoteButton
