const UPDATE_POST_TEXT = "UPDATE-POST-TEXT";
const ADD_POST = "ADD-POST";

const PostsReducer = (action, state) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                message: state.newPostText,
                likesCount: 0
            };
            state.posts.push(newPost); //добавляет новый пост в state для добавления используеться метод push()
            state.newPostText = ''; //обнуление, зачищает поле ввода поста
            return state;
        case  UPDATE_POST_TEXT:
            state.newPostText =  action.newText;
            return state;
        default:
            return state;
    }
};

export const addPostActionCreator = () => ( {type: ADD_POST} );
export const onPostChangeActionCreator = (text) => ( {type: UPDATE_POST_TEXT, newText: text} );

export default PostsReducer;