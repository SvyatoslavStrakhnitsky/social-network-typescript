import {combineReducers, createStore } from "redux";
import profileReducer, {ProfileActionsTypes} from "./profile-reducer";
import dialogsReducer, {DialogsReducerActionsTypes} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {UserPageActionsType, usersReducer} from "./users-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
})

export let store = createStore(rootReducer)

export type ReduxActionTypes = ProfileActionsTypes | DialogsReducerActionsTypes | UserPageActionsType

export type ReduxStoreType = typeof store;
export type ReduxStateType = ReturnType<typeof rootReducer>;
