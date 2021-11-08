import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET-USERS'
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'users/SET-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'users/TOGGLE-FOLLOWING-IN-PROGRESS'

type LocationType = {
    country: string
    city: string
}

export type UsersType = {
    id: number
    name: string
    followed: boolean
    status: string
    location: LocationType
    photos: {
        small: any
        large: any
    }
}

type UsersPageType = {
    users: UsersType[]
    usersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
type InitialStateType = UsersPageType

const initialState = {
    users: [],
    usersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

// creation Action Types
type FollowActionCreatorType = ReturnType<typeof followSuccess>
type UnfollowActionCreatorType = ReturnType<typeof unfollowSuccess>
type SetUsersActionCreatorType = ReturnType<typeof setUsers>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
type toggleFollowingInProgressActionType = ReturnType<typeof toggleFollowingProgress>

export type UserPageActionsType = FollowActionCreatorType
    | UnfollowActionCreatorType
    | SetUsersActionCreatorType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | toggleIsFetchingActionType
    | toggleFollowingInProgressActionType

export const usersReducer = (state: InitialStateType = initialState, action: UserPageActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.page}
        case SET_TOTAL_COUNT:
            return {...state, usersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state

    }
}

export const followSuccess = (userId: number) => ({type: FOLLOW, userId: userId} as const)
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId: userId} as const)
export const setUsers = (users: UsersType[]) => ({type: SET_USERS, users: users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, page: currentPage} as const)
export const setTotalUsersCount = (usersCount: number) => ({type: SET_TOTAL_COUNT, totalCount: usersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching} as const)
export const toggleFollowingProgress = (followingInProgress: [], userId: number) => (
    {type: TOGGLE_FOLLOWING_IN_PROGRESS, followingInProgress, userId} as const
)

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))

        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            })
    }
}

export const follow = (userId: number) => {
    return (dispatch: Dispatch) => {
        // @ts-ignore
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.followUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                // @ts-ignore
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: Dispatch) => {
        // @ts-ignore
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollowUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                // @ts-ignore
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}