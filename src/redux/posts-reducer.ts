import {PostType} from "../type/types";
import {InferActionTypes} from "./redux-store";

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

//Reducer
export const PostsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/POST/ADD-POST": {
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

//Actions
export const actions = {
    addPost: (newPostText: string) => ( {type: "SN/POST/ADD-POST", newPostText} as const )
}

//Types
type ActionsType = InferActionTypes<typeof actions>
type InitialStateType = typeof initialState;