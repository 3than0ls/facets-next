'use client'

import React, { useReducer } from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import {
    ACTIONS,
    reducer,
    initState,
    generateDefaultHandler,
} from './authFormReducer'
import { validatePassword, validateUsername } from './validation'
import { useRouter } from 'next/navigation'
import { createAccount } from '@/utils/supabase/authActions'

const CreateAccountMenu = () => {
    const [state, dispatch] = useReducer(reducer, initState)
    const router = useRouter()

    const handleUpdateUsername = generateDefaultHandler(
        dispatch,
        ACTIONS.UPDATE_USERNAME,
    )
    const handleUpdatePassword = generateDefaultHandler(
        dispatch,
        ACTIONS.UPDATE_PASSWORD,
    )

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()

        // some validation
        const usernameIsValid = validateUsername(state.username)
        if (!usernameIsValid.valid)
            return dispatch({
                type: ACTIONS.ERROR_USERNAME,
                payload: usernameIsValid.invalidReason,
            })

        const passwordIsValid = validatePassword(state.password)
        if (!passwordIsValid.valid)
            return dispatch({
                type: ACTIONS.ERROR_PASSWORD,
                payload: passwordIsValid.invalidReason,
            })

        try {
            await createAccount({
                username: state.username,
                password: state.password,
            })
            router.push('/')
            router.refresh()
        } catch {
            dispatch({
                type: ACTIONS.ERROR_USERNAME,
                payload: 'Username already exists.',
            })
        }
    }

    return (
        <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="w-full px-16 flex flex-col"
        >
            <InputField
                error={state.usernameError}
                onChange={handleUpdateUsername}
                label="Create Username"
            />
            <InputField
                error={state.passwordError}
                onChange={handleUpdatePassword}
                label="Create Password"
            />
            <SubmitButton text="Create Account" />
        </form>
    )
}

export default CreateAccountMenu
