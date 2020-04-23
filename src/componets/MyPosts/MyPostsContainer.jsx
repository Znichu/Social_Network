import React from "react";
import {addPostActionCreator, onPostChangeActionCreator} from "../../redux/posts-reducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {
    let state = props.store.getState();

    let addPost = () => { // функция обработки onClick
        props.store.dispatch(addPostActionCreator()); //
    };

    let onPostChange = (text) => { //обработчик onChange
        let action = onPostChangeActionCreator(text); //берет текст из значения поля для ввода
        props.store.dispatch(action); //значение textarea передается в аргументы функции, которая находится в state и прокинута сюда через пропс
    };

    return ( <MyPosts
        addPost={addPost}
        onPostChange={onPostChange}
        posts={state.myPostsPage}
        newPostText={state.myPostsPage.newPostText}

    />
    );

}
export default MyPostsContainer;