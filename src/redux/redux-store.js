import {combineReducers, createStore} from "redux";
import PostsReducer from "./posts-reducer";
import MessageReducer from "./messages-reducer";
import friendsReducer from "./friend-reducer";
import UsersReducer from "./users-reducer";

let reducers = combineReducers({
    myPostsPage: PostsReducer,
    messagesPage: MessageReducer,
    friendsBlock: friendsReducer,
    usersPage: UsersReducer
    });


let store = createStore(reducers);

window.store = store;

export default store;