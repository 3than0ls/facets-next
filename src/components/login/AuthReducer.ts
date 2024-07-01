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
    UPDATE_PASSWORD,
    USERNAME_ERR,
    PASSWORD_ERR,
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
        case ACTIONS.USERNAME_ERR:
            return { ...state, "username_error": action.payload ?? '' }
        case ACTIONS.PASSWORD_ERR:
            return { ...state, "password_error": action.payload ?? '' }
        case ACTIONS.CLEAR_ALL:
            return initState
        default:
            throw new Error("Invalid Reducer Action for Login Error")
    }
}