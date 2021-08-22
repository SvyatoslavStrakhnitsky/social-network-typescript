import s from './Users.module.css';
import React from "react";
import {UsersType} from "../../redux/users-reducer";
import {Preloader} from "../../common/Preloader";
import { NavLink } from 'react-router-dom';

type PropsType = {
    users: UsersType[]
    usersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const Users = (props: PropsType) => {

    let pageAmount = Math.ceil(props.usersCount / props.pageSize)
    const pages = []

    for (let i = 1; i <= pageAmount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {
                    pages.map(p => {
                        return (
                            <span className={props.currentPage === p ? s.selected : ''}
                                  onClick={(e) => props.onPageChange(p)}>{p}</span>
                        )
                    })
                }
            </div>
            {
               props.users.map(u => (
                    <div key={u.id}>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img className={s.icon} src={u.photos.small !== null
                                    ? u.photos.small
                                    : 'https://www.юятк.рф/images/Iconki/g45ghergre.png'} alt="avatar"/>
                            </NavLink>
                            <div>
                                {u.followed
                                    ? <button onClick={() => props.unfollow(u.id)}>UNFOLLOW</button>
                                    : <button onClick={() => props.follow(u.id)}>FOLLOW</button>}
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </div>
                            <div>
                                <div>{'u.location.city'}</div>
                                <div>{'u.location.country'}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}



