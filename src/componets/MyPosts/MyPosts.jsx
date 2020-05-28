import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";


const MyPosts = (props) => {
    let postsElement =
        props.posts.posts.map(p => <Post message={p.message} likes={p.likesCount}/>);

    let addPosts = (values) => { // функция обработки onClick
        props.addPost(values.textMyPost); //
    };

    return (

        <div className="container">
            <div className={s.create_post}>
                <div className={s.form_group}>
                    <AddMyPostFormRedux onSubmit={addPosts}/>
                </div>
            </div>
            <h5 style={{textAlign: "center", marginBottom: "20px", marginTop: "45px"}}>My posts</h5>
            <div>
                {postsElement}
            </div>
        </div>


    );
};

const AddMyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component="textarea" name="textMyPost" placeholder="Что у Вас нового?" className={s.form_control}/>
            <button className={s.btn_primary}>Опубликовать</button>
        </form>
    )
};

const AddMyPostFormRedux = reduxForm({form: "addMyPost"})(AddMyPostForm);

export default MyPosts;