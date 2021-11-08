import {ReduxStateType} from "./redux-store";

export const getAllUsers = (state: ReduxStateType) => state.usersPage.users
export const getPageSize = (state: ReduxStateType) => state.usersPage.pageSize
export const getTotalUsersCount = (state: ReduxStateType) => state.usersPage.usersCount
export const getCurrentPage = (state: ReduxStateType) => state.usersPage.currentPage
export const getIsFetching = (state: ReduxStateType) => state.usersPage.isFetching
export const getFollowingInProgress = (state: ReduxStateType) => state.usersPage.followingInProgress