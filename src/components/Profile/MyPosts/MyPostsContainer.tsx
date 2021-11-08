import React from 'react'
import {
    addPostActionCreator,
    PostsDataType
} from '../../../redux/profile-reducer'
import {ReduxStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {MyPosts} from './MyPosts';


type MapStatePropsType = {
    postsData: PostsDataType[]
}

type MapDispatchPropsType = {
    addPost: (newPost: string) => void
}

export type MyPostPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        postsData: state.profilePage.postsData,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (newPost: string) => {
            dispatch(addPostActionCreator(newPost))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
