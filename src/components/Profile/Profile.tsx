import React from 'react'
import {ProfileUserType} from '../../redux/profile-reducer'
import {MyPostsContainer} from './MyPosts/MyPostsContainer'
import {ProfileInfo} from './ProfileInfo/ProfileInfo'

export type PropsType = {
    profile: null | ProfileUserType | undefined
    status: string
    updateStatus: (status: string) => void
}

export const Profile = (props: PropsType) => {


    return (
        <main className='content'>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </main>
    )
}