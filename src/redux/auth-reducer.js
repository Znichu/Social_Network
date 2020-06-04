import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_DATA = "SET_AUTH_DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        default: return state
    }
};

export const setAuthUserData = ( userId, login, email, isAuth ) => ({type:SET_AUTH_DATA, data: {userId, login, email, isAuth }});

export const setAuth = () => (dispatch) => {
    authAPI.getAuth().then(data => {
        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(setAuthUserData(id, login, email, true));
        }
    });
};

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuth())
        } else {
            let message = data.messages[0];
            dispatch(stopSubmit("login", {_error: message}))
        }
    })
};

export const logout = () => (dispatch) => {
    authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    })
};

export default AuthReducer;