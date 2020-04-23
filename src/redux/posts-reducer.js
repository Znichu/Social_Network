const UPDATE_POST_TEXT = "UPDATE-POST-TEXT";
const ADD_POST = "ADD-POST";

let initialState = {
    posts: [
        {
            id: 1,
            message: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ',
            likesCount: 25
        },
        {
            id: 2,
            message: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing duskam azer. ',
            likesCount: 32
        },
        {
            id: 3,
            message: 'Images come in all sizes. So do screens. Responsive images automatically adjust to fit the size of the screen.',
            likesCount: 105
        }
    ],
        newPostText:''
};

const PostsReducer = (state = initialState, action) => {
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