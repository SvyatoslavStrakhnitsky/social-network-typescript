import s from './Users.module.css';
import React from "react";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from 'react-router-dom';

type PropsType = {
    user: UsersType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleFollowingProgress: (followingInProgress: [], userId: number) => void
    followingInProgress: number[]
}


export const User = (props: PropsType) => {

    const {user} = props

    return (
        <div key={user.id}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img className={s.icon} src={user.photos.small !== null
                        ? user.photos.small
                        : 'https://www.юятк.рф/images/Iconki/g45ghergre.png'} alt="avatar"/>
                </NavLink>
                <div>
                    {user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                                  onClick={() => props.unfollow(user.id)}>FOLLOW</button>
                        : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                  onClick={() => props.follow(user.id)}>UNFOLLOW</button>}
                </div>
            </div>
            <div>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div>
                    <div>{'u.location.city'}</div>
                    <div>{'u.location.country'}</div>
                </div>
            </div>
        </div>
    )
}



