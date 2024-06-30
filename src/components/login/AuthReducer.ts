/*
    Because CreateAccountMenu and LoginMenu deal with the literal same data, we can simply reuse the reducer functions
*/

const initState = {
    username: "",
    password: ""
}

export const enum ACTIONS {
    UPDATE_USERNAME,
    UPDATE_PASSWORD,
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
        case ACTIONS.CLEAR_ALL:
            return initState
        default:
            throw new Error("Invalid Reducer Action for Login Error")
    }
}