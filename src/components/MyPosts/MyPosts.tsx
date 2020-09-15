import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {maxLength, required} from "../../utils/Validation/FieldValidationForm";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {actions} from "../../redux/posts-reducer";
import {CustomButton} from "../../common/CustomButton/CustomButton";

//validator for form
const maxLength30 = maxLength(30);

type AddPostFormType = {
    textMyPost: string
}

export const MyPosts: React.FC = React.memo( () => {

    const posts = useSelector((state: RootState) => state.myPostsPage.posts)
    const avatar = useSelector((state: RootState) => state.myProfile.profile)

    const dispatch = useDispatch()

    let postsElement =
        posts.map(p => <Post key={p.id} avatar={avatar} message={p.message} likes={p.likesCount}/>);

    let addNewPosts = (values: AddPostFormType) => {
        dispatch(actions.addPost(values.textMyPost));
        dispatch(reset("addMyPost"))
    };

    return (
        <div className={style.postBlock}>
            <div className={style.create_post}>
                <div className={style.form_group}>
                    <AddMyPostFormRedux onSubmit={addNewPosts}/>
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
                placeholder="What on your mind?"
            />
            <div className={style.btn}>
                <CustomButton title={'Post'}/>
            </div>
        </form>
    )
};

const AddMyPostFormRedux = reduxForm<AddPostFormType>({form: "addMyPost"})(AddMyPostForm);
