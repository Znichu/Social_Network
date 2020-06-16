import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/Validation/FieldValidationForm";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength30 = maxLength(30);

const MyPosts = React.memo(props => {
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
            <div>
                {postsElement}
            </div>
        </div>


    );
});

const AddMyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                validate={[required, maxLength30]}
                component={Textarea}
                name="textMyPost"
                placeholder="Что у Вас нового?"
            />
            <div className={s.btn}>
                <button className="btn btn-primary">Опубликовать</button>
            </div>
        </form>
    )
};

const AddMyPostFormRedux = reduxForm({form: "addMyPost"})(AddMyPostForm);

export default MyPosts;