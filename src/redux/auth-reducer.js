import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getMyProfile, setMyStatus} from "./myProfile-reducer";

const SET_AUTH_DATA = "SET_AUTH_DATA";
const SET_CAPTCHA_URL_SUCCESS = "SET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAPTCHA_URL_SUCCESS:
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default: return state
    }
};

export const setAuthUserData = ( userId, login, email, isAuth ) => ({type:SET_AUTH_DATA, payload: {userId, login, email, isAuth }});
export const setCaptchaSuccess = ( captchaUrl ) => ({type:SET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }});

export const setAuth = () => (dispatch) => {
    return authAPI.getAuth().then(data => {
        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(getMyProfile(id));
            dispatch(setAuthUserData(id, login, email, true));
            dispatch(setMyStatus(id));
        }
    });
};

export const login = (email, password, rememberMe, captcha) => (dispatch) => {
     authAPI.login(email, password, rememberMe, captcha).then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuth())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
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

export const getCaptchaUrl = () => (dispatch) => {
    securityAPI.captchaUrl().then(data => {
            dispatch(setCaptchaSuccess(data.url))
    })
};

export default AuthReducer;