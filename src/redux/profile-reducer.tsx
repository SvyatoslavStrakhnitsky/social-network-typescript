import {ReduxActionTypes} from "./redux-store";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

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
    newPostText: string
    profile:  null | ProfileUserType | undefined

}

let initialState: ProfilePageType = {
    postsData: [
        {id: 1, message: 'How are you?', like: 1},
        {id: 2, message: 'It\'s my first post', like: 2},
    ],
    newPostText: '',
    profile: null
}

type initialStateType = ProfilePageType

type addPostActionType = {type: typeof ADD_POST}
type updatePostTextActionType = {type: typeof UPDATE_NEW_POST_TEXT, postMessage: string}
type setUserProfileAT = {type: typeof SET_USER_PROFILE, profile: ProfileUserType | null | undefined}

export type ProfileActionsTypes = addPostActionType | updatePostTextActionType | setUserProfileAT

const profileReducer = (state: initialStateType = initialState, action: ReduxActionTypes): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            const copyState = {...state}
            let newPostMessage = {id: 3, message: copyState.newPostText, like: 0}
            if (newPostMessage.message) copyState.postsData = [...state.postsData, newPostMessage]
            copyState.newPostText = ''
            return copyState
        }
        case UPDATE_NEW_POST_TEXT:{
            const copyState = {...state}
            copyState.newPostText = action.postMessage
            return copyState
        }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const setUserProfile = (profile: ProfileUserType | null | undefined) => ({type: SET_USER_PROFILE, profile: profile})
export const updateNewPostTextActionCreator = (text:  string | undefined) =>
    ({type: UPDATE_NEW_POST_TEXT, postMessage: text})

export default profileReducer