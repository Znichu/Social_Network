import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/Validation/FieldValidationForm";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {PostType, ProfileType} from "../../type/types";

const maxLength30 = maxLength(30);

type PropsType = {
    posts: Array<PostType>
    avatar: ProfileType | null
    addPost: (textMyPost: string) => void
}
type AddPostFormType = {
    textMyPost: string
}

const MyPosts: React.FC<PropsType> = React.memo(props => {
    let postsElement =
        props.posts.map(p => <Post key={p.id} avatar={props.avatar}  message={p.message} likes={p.likesCount}/>);

    let addPosts = (values: AddPostFormType) => { // функция обработки onClick
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

const AddMyPostForm: React.FC<InjectedFormProps<AddPostFormType>> = (props) => {
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

const AddMyPostFormRedux = reduxForm<AddPostFormType>({form: "addMyPost"})(AddMyPostForm);

export default MyPosts;