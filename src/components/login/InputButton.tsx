import React from 'react'

type InputButtonProps = {
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const InputButton = ({ text, onClick }: InputButtonProps) => {
    return (
        <button onClick={onClick} type="button" className="bg-primary px-16 py-2 my-4 mx-auto text-black rounded-md relative group overflow-hidden font-medium inline-block">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-accent group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">{text}</span>
        </button>
    )
}

export default InputButton

// cool buttons library: https://devdojo.com/tailwindcss/buttons