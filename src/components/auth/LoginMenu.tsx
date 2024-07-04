"use client"

import React, { useReducer } from 'react'
import InputField from './InputField'
import InputButton from './InputButton'
import { ACTIONS, reducer, initState, generateUpdateHandler } from './authReducer'
import { validatePassword, validateUsername } from './validation'
import { AuthApiError } from '@supabase/supabase-js'
import { signIn } from '@/utils/supabase/client'


const LoginMenu = () => {
    const [state, dispatch] = useReducer(reducer, initState)


    const handleUpdateUsername = generateUpdateHandler(dispatch, [{ type: ACTIONS.UPDATE_USERNAME }, { type: ACTIONS.ERROR_USERNAME, payload: '' }])
    const handleUpdatePassword = generateUpdateHandler(dispatch, [{ type: ACTIONS.UPDATE_PASSWORD }, { type: ACTIONS.ERROR_PASSWORD, payload: '' }])

    const handleSubmit = async (e: React.MouseEvent) => {
        const usernameIsValid = validateUsername(state.username)
        if (!usernameIsValid.valid)
            return dispatch({ type: ACTIONS.ERROR_USERNAME, payload: usernameIsValid.invalidReason })


        const passwordIsValid = validatePassword(state.password)
        if (!passwordIsValid.valid)
            return dispatch({ type: ACTIONS.ERROR_PASSWORD, payload: passwordIsValid.invalidReason })

        try {
            await signIn({ username: state.username, password: state.password })
        } catch (err) {
            if (err instanceof AuthApiError) {
                dispatch({ type: ACTIONS.ERROR_USERNAME, payload: "Invalid login credentials." })
                dispatch({ type: ACTIONS.ERROR_PASSWORD, payload: "Invalid login credentials." })
            }
            else
                throw err
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