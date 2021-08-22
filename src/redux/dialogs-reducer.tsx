import {ReduxActionTypes} from "./redux-store";

const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export type DialogsDataType = {
    id: number
    name: string
}
export type MessagesDataType = {
    id: number
    message: string
}

type DialogsPageType = {
    dialogsData: DialogsDataType[]
    messagesData: MessagesDataType[]
    newMessageText: string
}

let initialState = {
    dialogsData: [
        {id: 1, name: 'Sviatoslav'},
        {id: 2, name: 'Sveta'},
        {id: 3, name: 'Dima'},
        {id: 4, name: 'Roma'},
        {id: 5, name: 'Dasha'},
    ],
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Yo'},
        {id: 3, message: 'Bye'},
        {id: 4, message: 'Good'},
        {id: 5, message: 'Cool'},
    ],
    newMessageText: '',
}

type InitialStateType = DialogsPageType

type SendMessageActionType = { type: typeof SEND_MESSAGE }
type UpdateNewMessageText = { type: typeof UPDATE_NEW_MESSAGE_TEXT, sendMessage: string }

export type DialogsReducerActionsTypes = SendMessageActionType | UpdateNewMessageText

const dialogsReducer = (state: InitialStateType = initialState, action: ReduxActionTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE: {
            const copyState = {...state}
            let newMessage = {id: 6, message: copyState.newMessageText}
            if (newMessage.message) copyState.messagesData = [...state.messagesData, newMessage]
            copyState.newMessageText = ''
            return copyState
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            const copyState = {...state}
            copyState.newMessageText = action.sendMessage
            return copyState
        }
        default:
            return state
    }
}

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageTextActionCreator = (text: string | undefined) =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, sendMessage: text})

export default dialogsReducer