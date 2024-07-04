"use client"

import React, { useReducer } from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import { ACTIONS, reducer, initState, generateDefaultHandler } from './authFormReducer'
import { validatePassword, validateUsername } from './validation'
import { useRouter } from 'next/navigation'
import { login } from '@/utils/supabase/authActions'


const LoginMenu = () => {
    const [state, dispatch] = useReducer(reducer, initState)
    const router = useRouter()

    const handleUpdateUsername = generateDefaultHandler(dispatch, ACTIONS.UPDATE_USERNAME)
    const handleUpdatePassword = generateDefaultHandler(dispatch, ACTIONS.UPDATE_PASSWORD)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()

        // some validation
        const usernameIsValid = validateUsername(state.username)
        if (!usernameIsValid.valid)
            return dispatch({ type: ACTIONS.ERROR_USERNAME, payload: usernameIsValid.invalidReason })

        const passwordIsValid = validatePassword(state.password)
        if (!passwordIsValid.valid)
            return dispatch({ type: ACTIONS.ERROR_PASSWORD, payload: passwordIsValid.invalidReason })

        try {
            await login({ username: state.username, password: state.password })
            router.push('/')
        } catch (err) {
            dispatch({ type: ACTIONS.ERROR_USERNAME, payload: "Invalid login credentials." })
            dispatch({ type: ACTIONS.ERROR_PASSWORD, payload: "Invalid login credentials." })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full px-16 flex flex-col">
            <InputField error={state.username_error} onChange={handleUpdateUsername} label="Username" />
            <InputField error={state.password_error} onChange={handleUpdatePassword} label="Password" />
            <SubmitButton text="Login" />
        </form>
    )
}

export default LoginMenu