import React, {ChangeEvent} from 'react'
import {Post} from './Post/Post'
import {MyPostPropsType} from "./MyPostsContainer";

export const MyPosts = (props: MyPostPropsType) => {

    let postElements = props.postsData.map(post => <Post message={post.message} like={post.like}/>)
    let newPostElement = props.newPostText

    const addPost = () => {
        props.addPost()
    }

    const onChangePostMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        if (text) props.updateNewPostText(text)
    }

    return (
        <div>
            My posts
            <div>
                <div>
                    <textarea value={newPostElement} onChange={onChangePostMessage}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            {postElements}
        </div>
    )
}