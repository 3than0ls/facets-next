import React from 'react'
import InputField from './InputField'
import InputButton from './InputButton'

const LoginMenu = () => {
    return (
        <div className="w-full px-16 flex flex-col">
            <InputField label="Username" />
            <InputField label="Password" />
            <InputButton text="Login" />
        </div>
    )
}

export default LoginMenu