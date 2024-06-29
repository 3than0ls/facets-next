import React from 'react'


type InputFieldProps = {
    label: string
}

const InputField = ({ label }: InputFieldProps) => {
    return (
        <div className="my-2">
            <label htmlFor={label} className="text-md text-secondary mx-2">{label}</label>
            <input id={label} className="bg-primary mt-[2px] w-full h-full rounded-xl p-3 outline-none hover:outline-none border-2 border-transparent hover:border-accent focus:border-accent transition-colors duration-200" />
        </div>
    )
}

export default InputField