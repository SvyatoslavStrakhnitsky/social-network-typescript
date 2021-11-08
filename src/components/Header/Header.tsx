import React from "react";
import {NavLink} from "react-router-dom"
import s from "./Header.module.css"

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

export const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className='header'>
            <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="logo"/>
            <div className={s.loginBlock}>
                {
                    props.isAuth
                        ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}