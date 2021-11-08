import {combineReducers, createStore, applyMiddleware } from "redux";
import profileReducer, {ProfileActionsTypes} from "./profile-reducer";
import dialogsReducer, {DialogsReducerActionsTypes} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {UserPageActionsType, usersReducer} from "./users-reducer";
import authReducer, {AuthActionsType} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
})

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type ReduxActionTypes = ProfileActionsTypes | DialogsReducerActionsTypes | UserPageActionsType | AuthActionsType

export type ReduxStoreType = typeof store;
export type ReduxStateType = ReturnType<typeof rootReducer>;


// @ts-ignore
window.store = store