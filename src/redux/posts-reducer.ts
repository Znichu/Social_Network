const ADD_POST = "ADD-POST";

type PostType = {
    id: number
    message: string
    likesCount: number
}
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
    ] as Array<PostType>,
    newPostText: ''
};
type InitialStateType = typeof initialState;

const PostsReducer = (state = initialState, action: any): InitialStateType => {
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

type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ( {type: ADD_POST, newPostText} );


export default PostsReducer;