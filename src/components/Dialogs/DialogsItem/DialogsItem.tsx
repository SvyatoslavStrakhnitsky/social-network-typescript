import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './../Dialogs.module.css'

export type DialogsItemPropsType = {
    name: string
    id: number
}

export const DialogsItem: React.FC<DialogsItemPropsType> = (props) => {
    return (
        <div key={props.id} className={style.dialog}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}
