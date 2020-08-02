import {applyMiddleware, combineReducers, createStore} from "redux";
import {PostsReducer} from "./posts-reducer";
import {MessageReducer} from "./messages-reducer";
import {friendsReducer} from "./friend-reducer";
import {UsersReducer} from "./users-reducer";
import {ProfileReducer} from "./profile-reducer";
import {AuthReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import {myProfileReducer} from "./myProfile-reducer";
import { reducer as formReducer } from 'redux-form';
import {AppReducer} from "./app-reducer";

let rootReducer = combineReducers({
    myPostsPage: PostsReducer,
    messagesPage: MessageReducer,
    friendsBlock: friendsReducer,
    usersPage: UsersReducer,
    profileUser: ProfileReducer,
    auth: AuthReducer,
    myProfile: myProfileReducer,
    app: AppReducer,
    form: formReducer
    });

type State = typeof rootReducer
export type RootState = ReturnType<State>;

/*type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;

export type GetActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>*/

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// @ts-ignore
window.store = store;

export default store