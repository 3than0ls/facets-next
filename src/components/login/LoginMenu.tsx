"use client"

import React, { useReducer } from 'react'
import InputField from './InputField'
import InputButton from './InputButton'
import { ACTIONS, reducer, initState } from './AuthReducer'
import { passwordIsValid, usernameIsValid } from './validation'


const LoginMenu = () => {
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
        }

        if (!passwordIsValid(state.password)) {
            dispatch({ type: ACTIONS.PASSWORD_ERR, payload: "Password must be filled." })
        }
    }

    return (
        <div className="w-full px-16 flex flex-col">
            <InputField error={state.username_error} onChange={handleUpdateUsername} label="Username" />
            <InputField error={state.password_error} onChange={handleUpdatePassword} label="Password" />
            <InputButton onClick={handleSubmit} text="Login" />
        </div>
    )
}

export default LoginMenu