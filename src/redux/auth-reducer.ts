import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = "auth/SET-AUTH-USER-DATA"

export type AuthPropsType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type SetAuthUserDataAT = {
    type: typeof SET_AUTH_USER_DATA
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}

export type AuthActionsType = SetAuthUserDataAT

const authReducer = (state: AuthPropsType = initialState, action: AuthActionsType): AuthPropsType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataAT => (
    {type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}}
)

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}


export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
    const response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch<any>(getAuthUserData())
    } else {
        const errorMessage = response.data.messages.length > 0
            ? response.data.messages[0]
            : 'Email or password is wrong'
        dispatch(stopSubmit("login", {_error: errorMessage}))
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    const response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch<any>(setAuthUserData(null, null, null, false))
    }
}


export default authReducer