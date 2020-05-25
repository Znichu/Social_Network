import {applyMiddleware, combineReducers, createStore} from "redux";
import PostsReducer from "./posts-reducer";
import MessageReducer from "./messages-reducer";
import friendsReducer from "./friend-reducer";
import UsersReducer from "./users-reducer";
import ProfileReducer from "./profile-reducer";
import AuthReducer from "./auth-reducer";
import thunk from "redux-thunk";
import myProfileReducer from "./myProfile-reducer";



let reducers = combineReducers({
    myPostsPage: PostsReducer,
    messagesPage: MessageReducer,
    friendsBlock: friendsReducer,
    usersPage: UsersReducer,
    profileUser: ProfileReducer,
    auth: AuthReducer,
    myProfile: myProfileReducer
    });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

window.store = store;

export default store;