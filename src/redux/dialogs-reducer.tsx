import {ReduxActionTypes} from "./redux-store";

const SEND_MESSAGE = 'SEND_MESSAGE'


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

type SendMessageActionType = ReturnType<typeof sendMessageActionCreator>

export type DialogsReducerActionsTypes = SendMessageActionType

const dialogsReducer = (state: InitialStateType = initialState, action: ReduxActionTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE: {
            const copyState = {...state}
            let newMessage = {id: 6, message: action.newMessageBody}
            if (newMessage.message) copyState.messagesData = [...state.messagesData, newMessage]
            copyState.newMessageText = ''
            return copyState
        }
        default:
            return state
    }
}

export const sendMessageActionCreator = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const)

export default dialogsReducer