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
    ]
};

const PostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {
                    id: 4,
                    message: action.newPostText,
                    likesCount: 0
                }]
            };
        }
        default: return state;
    }
};

export const addPost = (newPostText) => ( {type: ADD_POST, newPostText} );


export default PostsReducer;