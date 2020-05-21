import {applyMiddleware, combineReducers, createStore} from "redux";
import PostsReducer from "./posts-reducer";
import MessageReducer from "./messages-reducer";
import friendsReducer from "./friend-reducer";
import UsersReducer from "./users-reducer";
import ProfileReducer from "./profile-reducer";
import AuthReducer from "./auth-reducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
    myPostsPage: PostsReducer,
    messagesPage: MessageReducer,
    friendsBlock: friendsReducer,
    usersPage: UsersReducer,
    profileUser: ProfileReducer,
    auth: AuthReducer
    });


let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;