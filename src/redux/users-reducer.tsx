const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

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
}
type InitialStateType = UsersPageType

const initialState = {
    users: [],
    usersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false
}

// creation Action Types
type FollowActionCreatorType =  {type: typeof FOLLOW, userId: number}
type UnfollowActionCreatorType =  {type: typeof UNFOLLOW, userId: number}
type SetUsersActionCreatorType =  {type: typeof SET_USERS, users: UsersType[]}
type SetCurrentPageActionType = {type: typeof SET_CURRENT_PAGE, page: number}
type SetTotalUsersCountActionType = {type: typeof SET_TOTAL_COUNT, totalCount: number}
type toggleIsFetchingActionType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}

export type UserPageActionsType = FollowActionCreatorType
    | UnfollowActionCreatorType
    | SetUsersActionCreatorType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | toggleIsFetchingActionType

export const usersReducer = (state: InitialStateType = initialState, action: UserPageActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                   if (u.id === action.userId) {
                        return {...u, followed: true}
                   }
                   return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
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
        default:
            return state

    }
}

export const follow = (userId: number) => ({type: FOLLOW, userId: userId})
export const unfollow = (userId: number) => ({type: UNFOLLOW, userId: userId})
export const setUsers = (users: UsersType[]) => ({type: SET_USERS, users: users})
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, page: currentPage})
export const setTotalUsersCount = (usersCount: number) => ({type: SET_TOTAL_COUNT, totalCount: usersCount})
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})