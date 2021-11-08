import React from "react"
import {NavLink} from "react-router-dom"
import style from './Navbar.module.css'

export const Navbar = () => {
    return (
        <aside className={style.aside}>
            <nav>
                <ul>
                    <li className={style.item}>
                        <NavLink to='/profile'>Profile</NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='/dialogs'>Message</NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='/users'>Users</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}