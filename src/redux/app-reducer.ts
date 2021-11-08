import {Dispatch} from "redux";
import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED = "app/SET-INITIALIZED"

export type AppReducerPropsType = {
    initialized: boolean
}

const initialState = {
    initialized: false
}

export type SetInitialized = ReturnType<typeof setInitializedAC>


const appReducer = (state: AppReducerPropsType = initialState, action: SetInitialized): AppReducerPropsType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

export const setInitializedAC = () => ({type: SET_INITIALIZED, initialized: true} as const)

export const initializeApp = () => async (dispatch: Dispatch) => {
    await dispatch<any>(getAuthUserData())
    dispatch(setInitializedAC())
}

export default appReducer