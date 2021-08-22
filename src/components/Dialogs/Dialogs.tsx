import React, {ChangeEvent} from 'react'
import style from './Dialogs.module.css'
import {DialogsItem} from './DialogsItem/DialogsItem'
import {MessagesItem} from './MessagesItem/MessagesItem'
import {DialogsPropsType} from "./DialogsContainer";


export const Dialogs = (props: DialogsPropsType) => {

    const dialogElements = props.dialogsData.map( dialog => <DialogsItem name={dialog.name} id={dialog.id}/>)
    const messageElements = props.messagesData.map( message => <MessagesItem message={message.message}/>)
    const newMessageElement = props.newMessageText

    const sendMessage = () => {
        props.sendMessage()
    }
    const onChangeMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewMessageText(text)
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItem}>
                { dialogElements }
            </div>
            <div className={style.messageItem}>
                { messageElements }
                <div>
                    <textarea value={newMessageElement}
                              placeholder={'Enter message'}
                              onChange={onChangeMessageText} />
                    <div>
                        <button onClick={sendMessage}>Send</button></div>
                </div>
            </div>
        </div>
    )
}