import React from 'react'

type InputFieldProps = {
    label: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    error?: string
}

const InputField = ({ label, onChange, error }: InputFieldProps) => {
    const borderColor = error === '' ? 'border-transparent' : 'border-red-600'

    return (
        <div className="my-2">
            <label htmlFor={label} className="text-md text-black mx-2">
                {label}
            </label>
            <input
                id={label}
                onChange={onChange}
                className={`bg-primary mt-[2px] w-full h-full rounded-xl p-3 outline-none hover:outline-none border-2 hover:border-accent focus:border-accent ${borderColor} transition-colors duration-150`}
            />
            {error ? (
                <span className="text-red-600 mt-[2px] mx-2">{error}</span>
            ) : (
                ''
            )}
        </div>
    )
}

export default InputField
