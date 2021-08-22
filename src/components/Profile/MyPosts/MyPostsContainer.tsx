import React from 'react'
import {
    addPostActionCreator,
    PostsDataType,
    updateNewPostTextActionCreator
} from '../../../redux/profile-reducer'
import {ReduxStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {MyPosts} from './MyPosts';


type MapStatePropsType = {
    postsData: PostsDataType[]
    newPostText: string
}

type MapDispatchPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
}

export type MyPostPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostTextActionCreator(text))
        },
        addPost: () => {
            dispatch(addPostActionCreator())
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
