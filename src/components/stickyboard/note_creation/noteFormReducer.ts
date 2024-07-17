import { useReducer } from 'react'
import { validateText, validateTitle } from './validation'

const initState = {
    title: '',
    text: '',
    titleError: '',
    textError: '',
}

export const enum ACTIONS {
    UPDATE_TITLE,
    UPDATE_TEXT,
}

type ReducerAction = {
    type: ACTIONS
    payload: string
}

const reducer = (
    state: typeof initState,
    action: ReducerAction,
): typeof initState => {
    switch (action.type) {
        case ACTIONS.UPDATE_TITLE: {
            const validTitle = validateTitle(action.payload)
            return {
                ...state,
                title: action.payload,
                titleError: validTitle.valid ? '' : validTitle.invalidReason!,
            }
        }
        case ACTIONS.UPDATE_TEXT: {
            const validText = validateText(action.payload)
            return {
                ...state,
                text: action.payload,
                textError: validText.valid ? '' : validText.invalidReason!,
            }
        }
        default:
            throw new Error(`Invalid Reducer Action: ${action}`)
    }
}

export const useNoteReducer = () => {
    return useReducer(reducer, initState)
}
