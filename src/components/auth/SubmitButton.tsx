import React from 'react'

type SubmitButtonProps = {
    text: string,
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
    return (
        <button type="submit" className="bg-primary px-16 py-2 my-4 mx-auto text-black rounded-md relative group overflow-hidden font-medium inline-block">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-accent group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">{text}</span>
        </button>
    )
}

export default SubmitButton

// cool buttons library: https://devdojo.com/tailwindcss/buttons