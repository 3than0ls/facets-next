import React from 'react'
import InputField from './InputField'
import InputButton from './InputButton'

const CreateAccountMenu = () => {
    return (
        <div className="w-full px-16 flex flex-col">
            <InputField label="Create Username" />
            <InputField label="Create Password" />
            <InputButton text="Create Account" />
        </div>
    )
}

export default CreateAccountMenu