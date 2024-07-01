"use client"

import React, { useReducer } from 'react'
import InputField from './InputField'
import InputButton from './InputButton'
import { ACTIONS, reducer, initState } from './AuthReducer'
import { passwordIsValid, newUsernameIsUnique, usernameIsValid } from './validation'


const CreateAccountMenu = () => {
    const [state, dispatch] = useReducer(reducer, initState)

    const handleUpdateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.UPDATE_USERNAME, payload: e.target.value })
        // username is updated, make no assumptions about it and clear error
        dispatch({ type: ACTIONS.USERNAME_ERR, payload: '' })
    }

    const handleUpdatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.UPDATE_PASSWORD, payload: e.target.value })
        // password is updated, make no assumptions about it and clear error
        dispatch({ type: ACTIONS.PASSWORD_ERR, payload: '' })
    }

    const handleSubmit = (e: React.MouseEvent) => {
        if (!usernameIsValid(state.username)) {
            dispatch({ type: ACTIONS.USERNAME_ERR, payload: "Username must be filled." })
        } else if (!newUsernameIsUnique(state.username)) {
            dispatch({ type: ACTIONS.USERNAME_ERR, payload: "Username already taken." })
        }

        if (!passwordIsValid(state.password)) {
            dispatch({ type: ACTIONS.PASSWORD_ERR, payload: "Password must be filled." })
        }



        /*
            state.username
            state.password


            create account credential validation (ensure doesn't already exist)
        */
    }

    return (
        <div className="w-full px-16 flex flex-col">
            <InputField error={state.username_error} onChange={handleUpdateUsername} label="Create Username" />
            <InputField error={state.password_error} onChange={handleUpdatePassword} label="Create Password" />
            <InputButton onClick={handleSubmit} text="Create Account" />
        </div>
    )
}

export default CreateAccountMenu