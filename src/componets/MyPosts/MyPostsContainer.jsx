import React from "react";
import {addPostActionCreator, onPostChangeActionCreator} from "../../redux/posts-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {withRedirect} from "../../hoc/hoc";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        posts: state.myPostsPage,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => { // функция обработки onClick
            dispatch(addPostActionCreator());
        },
        onPostChange: (text) => { //обработчик onChange
            let action = onPostChangeActionCreator(text); //берет текст из значения поля для ввода
            dispatch(action); //значение textarea передается в аргументы функции, которая находится в state и прокинута сюда через пропс
        },
    }
};

export default compose(
    withRedirect,
    connect (mapStateToProps, mapDispatchToProps)
) (MyPosts);
