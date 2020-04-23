import {combineReducers, createStore} from "redux";
import PostsReducer from "./posts-reducer";
import MessageReducer from "./messages-reducer";
import friendsReducer from "./friend-reducer";

let reducers = combineReducers({
    myPostsPage: PostsReducer,
    messagesPage: MessageReducer,
    friendsBlock: friendsReducer
    });


let store = createStore(reducers);

export default store;