import React from 'react'


type InputFieldProps = {
    label: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    error?: string // TODO: implement
}

const InputField = ({ label, onChange }: InputFieldProps) => {
    return (
        <div className="my-2">
            <label htmlFor={label} className="text-md text-secondary mx-2">{label}</label>
            <input id={label} onChange={onChange} className="bg-primary mt-[2px] w-full h-full rounded-xl p-3 outline-none hover:outline-none border-2 border-transparent hover:border-accent focus:border-accent transition-colors duration-200" />
        </div>
    )
}

export default InputField