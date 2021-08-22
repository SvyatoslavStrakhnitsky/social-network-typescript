import React from 'react'
import { ProfileUserType } from '../../redux/profile-reducer'
import {MyPostsContainer} from './MyPosts/MyPostsContainer'
import {ProfileInfo} from './ProfileInfo/ProfileInfo'

export type PropsType = {
    profile: null | ProfileUserType | undefined
}

export const Profile = (props: PropsType) => {
    return (
        <main className='content'>
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer/>
        </main>
    )
}