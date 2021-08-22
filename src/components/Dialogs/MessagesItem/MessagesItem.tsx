import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './../Dialogs.module.css'

type MessagesItemPropsType = {
    message: string;
}
export const MessagesItem: React.FC<MessagesItemPropsType> = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    )
}

