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

export const reducer = (state: typeof initState, action: ReducerAction): typeof initState => {
    switch (action.type) {
        case ACTIONS.UPDATE_USERNAME:
            return { ...state, "username": action.payload ?? '' }
        case ACTIONS.UPDATE_PASSWORD:
            return { ...state, "password": action.payload ?? '' }
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
 *  Payload can be customized by specifying `payload` in each `ReducerAction` in `actions`
 *  If payload is not specified, `e.target.value` is set as the payload.
 * 
 * @param dispatch Reducer dispatcher.
 * @param actions  Array of `ReducerAction`. 
 * @returns Update handler function.
 */
export function generateUpdateHandler(dispatch: React.Dispatch<ReducerAction>, actions: ReducerAction[]) {
    // allows update handlers to be easily generated based on what action from ACTIONS you want to occur
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        for (let action of actions) {
            dispatch!({ type: action.type, payload: action.payload ?? e.target.value })
        }
    }
}