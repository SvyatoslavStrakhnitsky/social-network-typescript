import React from 'react'
import {Post} from './Post/Post'
import {MyPostPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators";
import {Textarea} from "../../../common/FormControls";

type MyPostsType = {newPost: string}

const maxLength10 = maxLengthCreator(10)
export const MyPosts = (props: MyPostPropsType) => {

    let postElements = props.postsData.map(post => <Post key={post.id} message={post.message} like={post.like}/>)

    const addPost = (value: MyPostsType) => {
        props.addPost(value.newPost)
    }

    return (
        <div>
            My posts
            <MyPostsReduxForm onSubmit={addPost}/>
            {postElements}
        </div>
    )
}

const MyPostsForm: React.FC<InjectedFormProps<MyPostsType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newPost" placeholder="Enter your post" validate={[requiredField, maxLength10]}/>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const MyPostsReduxForm = reduxForm<MyPostsType>({form: "addProfilePostForm"})(MyPostsForm)