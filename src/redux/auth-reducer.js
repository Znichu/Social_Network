import {authAPI} from "../api/api";

const SET_AUTH_DATA = "SET_AUTH_DATA";
const SET_LOGIN_DATA = "SET_LOGIN_DATA";

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
                isAuth: true
            }
        }
        case SET_LOGIN_DATA: {
            return {
                userId: action.usersId,
                isAuth: true
            }
        }
        default: return state
    }
};

export const setAuthUserData = ( userId, login, email ) => ({type:SET_AUTH_DATA, data: {userId, login,email }});
export const setLoginData = (usersId) => ({type:SET_LOGIN_DATA, usersId});

export const setAuth = () => (dispatch) => {
    authAPI.getAuth().then(data => {
        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(setAuthUserData(id, login, email));
        }
    });
};

export const setLogin = (value) => (dispatch) => {
    authAPI.login(value.login, value.password, value.rememberMe).then(data => {
        if (data.resultCode === 0) {
            dispatch(setLoginData(data.data.usersId))
        }
    })
};

export default AuthReducer;