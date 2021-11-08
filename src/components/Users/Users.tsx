import React from "react";
import {UsersType} from "../../redux/users-reducer";
import {User} from "./User";
import {Pagination} from "../../common/Pagination";

type PropsType = {
    users: UsersType[]
    usersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleFollowingProgress: (followingInProgress: [], userId: number) => void
    followingInProgress: number[]
}


export const Users = (props: PropsType) => {

    return (
        <div>
            <Pagination currentPage={props.usersCount}
                        totalCount={props.usersCount}
                        pageSize={props.pageSize}
                        onPageChange={props.onPageChange}/>
            {
                props.users.map(user =>
                    <User key={user.id} user={user}
                          follow={props.follow}
                          unfollow={props.unfollow} toggleFollowingProgress={props.toggleFollowingProgress}
                          followingInProgress={props.followingInProgress}/>
                )}
        </div>
    )
}



