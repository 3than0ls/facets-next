"use client"

import React, { useReducer } from 'react'
import InputField from './InputField'
import InputButton from './InputButton'
import { ACTIONS, reducer } from './AuthReducer'


const CreateAccountMenu = () => {
    const [state, dispatch] = useReducer(reducer, { username: "", password: "" })

    const handleUpdateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        // client side username validation (not empty)
        dispatch({ type: ACTIONS.UPDATE_USERNAME, payload: e.target.value })
    }

    const handleUpdatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        // client side password validation (not empty)
        dispatch({ type: ACTIONS.UPDATE_PASSWORD, payload: e.target.value })
    }

    const handleSubmit = (e: React.MouseEvent) => {
        console.log(state.username, state.password)
        /*
            state.username
            state.password


            create account credential validation (ensure doesn't already exist)
        */
    }

    return (
        <div className="w-full px-16 flex flex-col">
            <InputField onChange={handleUpdateUsername} label="Create Username" />
            <InputField onChange={handleUpdatePassword} label="Create Password" />
            <InputButton onClick={handleSubmit} text="Create Account" />
        </div>
    )
}

export default CreateAccountMenu