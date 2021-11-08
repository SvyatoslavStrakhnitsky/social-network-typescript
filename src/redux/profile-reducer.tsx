import {ReduxActionTypes} from "./redux-store";
import {profileAPI} from "../api/api";
import {Dispatch} from "redux";

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const GET_STATUS = 'profile/GET-STATUS'

export type PostsDataType = {
    id: number
    message: string
    like: number
}

export type ProfileUserType = {
    photos: {
        large: null | string
        small: null | string
    }
}

export type ProfilePageType = {
    postsData: PostsDataType[]
    profile: null | ProfileUserType | undefined
    status: string
    newPost: string
}

let initialState: ProfilePageType = {
    postsData: [
        {id: 1, message: 'How are you?', like: 1},
        {id: 2, message: 'It\'s my first post', like: 2},
    ],
    newPost: "",
    profile: null,
    status: '',
}

type initialStateType = ProfilePageType

type addPostActionType = ReturnType<typeof addPostActionCreator>
type setUserProfileAT = ReturnType<typeof setUserProfile>
type getStatusAT = ReturnType<typeof setStatus>

export type ProfileActionsTypes = addPostActionType | setUserProfileAT | getStatusAT

const profileReducer = (state: initialStateType = initialState, action: ReduxActionTypes): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            const copyState = {...state}
            let newPostMessage = {id: 3, message: action.newPost, like: 0}
            if (newPostMessage.message) copyState.postsData = [...state.postsData, newPostMessage]
            return copyState
        }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case GET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

export const addPostActionCreator = (newPost: string) => ({type: ADD_POST, newPost} as const)
export const setUserProfile = (profile: ProfileUserType | null | undefined) => ({
    type: SET_USER_PROFILE,
    profile: profile
} as const)
export const setStatus = (status: string) => ({type: GET_STATUS, status} as const)


export const getUserProfile = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export default profileReducer