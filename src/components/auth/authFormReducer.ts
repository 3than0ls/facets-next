/*
    Because CreateAccountMenu and LoginMenu deal with the literal same data, we can simply reuse the reducer functions
*/

export const initState = {
    username: "",
    password: "",
    username_error: "",
    password_error: "",
}

export const enum ACTIONS {
    UPDATE_USERNAME,
    ERROR_USERNAME,
    UPDATE_PASSWORD,
    ERROR_PASSWORD,
    CLEAR_ALL
}

type ReducerAction = {
    type: ACTIONS,
    payload?: string
}


/**
 * Determines if the state is one that is after invalid login credentials have been typed.
 * Does this by checking the error states.
 * Purpose: Invalid login credential error is set to both username and password, and so when either username or password is updated, both must be cleared.
 * However, only if it's an invalid login error state
 * 
 * @param state reducer state
 * @returns 
 */
const isAfterInvalidLoginCredentials = (state: typeof initState) => {
    return state["username_error"] === "Invalid login credentials." || state["password_error"] === "Invalid login credentials."
}

export const reducer = (state: typeof initState, action: ReducerAction): typeof initState => {
    let clearErrors = {}
    if (isAfterInvalidLoginCredentials(state)) {
        clearErrors = { ...state, "username_error": '', "password_error": '' }
    }

    console.log(action.payload)

    switch (action.type) {
        case ACTIONS.UPDATE_USERNAME:
            return { ...state, ...clearErrors, "username_error": '', "username": action.payload ?? '' }
        case ACTIONS.UPDATE_PASSWORD:
            return { ...state, ...clearErrors, "password_error": '', "password": action.payload ?? '' }
        case ACTIONS.ERROR_USERNAME:
            return { ...state, "username_error": action.payload ?? '' }
        case ACTIONS.ERROR_PASSWORD:
            return { ...state, "password_error": action.payload ?? '' }
        case ACTIONS.CLEAR_ALL:
            return initState
        default:
            throw new Error(`Invalid Reducer Action: ${action}`)
    }
}


/**
 * * Generates update handlers that dispatch events.
 *  Payload defaults to `e.target.value`, but if undefined/null, defaults to empty string.
 * 
 * @param dispatch Reducer dispatcher.
 * @param actions  ReducerAction
 * @returns Update handler function.
 */
export function generateDefaultHandler(dispatch: React.Dispatch<ReducerAction>, action: ACTIONS) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: action, payload: e.target.value ?? '' })
    }
}