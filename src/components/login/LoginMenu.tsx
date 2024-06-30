"use client"

import React, { Reducer, useReducer } from 'react'
import InputField from './InputField'
import InputButton from './InputButton'
import { ACTIONS, reducer } from './AuthReducer'


const LoginMenu = () => {
    const [state, dispatch] = useReducer(reducer, { username: "", password: "" })

    const handleUpdateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.UPDATE_USERNAME, payload: e.target.value })
    }

    const handleUpdatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ACTIONS.UPDATE_PASSWORD, payload: e.target.value })
    }

    const handleSubmit = (e: React.MouseEvent) => {
        console.log(state.username, state.password)
        /*
            state.username
            state.password

            
            log in credential validation
        */
    }

    return (
        <div className="w-full px-16 flex flex-col">
            <InputField onChange={handleUpdateUsername} label="Username" />
            <InputField onChange={handleUpdatePassword} label="Password" />
            <InputButton onClick={handleSubmit} text="Login" />
        </div>
    )
}

export default LoginMenu