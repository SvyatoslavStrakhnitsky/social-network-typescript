import React from 'react'
import style from './Dialogs.module.css'
import {DialogsItem} from './DialogsItem/DialogsItem'
import {MessagesItem} from './MessagesItem/MessagesItem'
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../utils/validators";
import {Textarea} from "../../common/FormControls";

type SendMessageType = {newMessageBody: string}

const maxLength100 = maxLengthCreator(100)

export const Dialogs = (props: DialogsPropsType) => {

    const dialogElements = props.dialogsData.map(dialog => <DialogsItem key={dialog.id} name={dialog.name} id={dialog.id}/>)
    const messageElements = props.messagesData.map(message => <MessagesItem key={message.id} message={message.message}/>)

    const sendMessage = (value: SendMessageType) => {
        props.sendMessage(value.newMessageBody)
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItem}>
                {dialogElements}
            </div>
            <div className={style.messageItem}>
                {messageElements}
                <AddReduxMessageForm onSubmit={sendMessage}/>
            </div>
        </div>
    )
}


export const AddMessageForm: React.FC<InjectedFormProps<SendMessageType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newMessageBody" placeholder="Enter message" validate={[requiredField, maxLength100]}/>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddReduxMessageForm = reduxForm<SendMessageType>({form: "addDialogMessageForm"})(AddMessageForm)