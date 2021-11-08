import React from 'react'
import style from './Post.module.css'

type MessagePropsType = {
    message: string
    like: number
}

export const Post: React.FC<MessagePropsType> = (props) => {
    return (
        <div className={style.post}>
            <img src="https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg" alt=""/>
            {props.message}
            <div>{props.like}</div>
        </div>
    )
}