import React from 'react'
import {
    DialogsDataType,
    MessagesDataType,
    sendMessageActionCreator,
    updateNewMessageTextActionCreator
} from '../../redux/dialogs-reducer'
import {Dialogs} from "./Dialogs";
import {ReduxStateType} from "../../redux/redux-store";
import {connect} from 'react-redux';
import {Dispatch} from 'redux';


type MapStatePropsType = {
    dialogsData: DialogsDataType[]
    messagesData: MessagesDataType[]
    newMessageText: string
}

type MapDispatchPropsType = {
    updateNewMessageText: (text: string) => void
    sendMessage: () => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(updateNewMessageTextActionCreator(text))
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)


