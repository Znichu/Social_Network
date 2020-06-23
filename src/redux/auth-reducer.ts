import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getMyProfile, setMyStatus} from "./myProfile-reducer";

const SET_AUTH_DATA = "SET_AUTH_DATA";
const SET_CAPTCHA_URL_SUCCESS = "SET_CAPTCHA_URL_SUCCESS";

type InitialStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    captchaUrl: null | string
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const AuthReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_CAPTCHA_URL_SUCCESS:
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.payload
            };
        default: return state
    }
};

type PayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean | null
}
type SetAuthUserDataType = {
    type: typeof SET_AUTH_DATA
    payload: PayloadType
}
export const setAuthUserData = ( userId: number | null, login: string | null, email: string | null, isAuth: boolean ): SetAuthUserDataType => ({type:SET_AUTH_DATA, payload: { userId, login, email, isAuth }});
type SetCaptchaSuccessType = {
    type: typeof SET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}
export const setCaptchaSuccess = ( captchaUrl: string ): SetCaptchaSuccessType => ({type:SET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }});

export const setAuth = () => (dispatch: any) => {
    return authAPI.getAuth().then((data: { resultCode: number; data: { id: number; login: string; email: string; }; }) => {
        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(getMyProfile(id));
            dispatch(setAuthUserData(id, login, email, true));
            dispatch(setMyStatus(id));
        }
    });
};

export const login = (email: string, password: number, rememberMe: boolean, captcha: string) => (dispatch: any) => {
     authAPI.login(email, password, rememberMe, captcha).then((data: { resultCode: number; messages: any[]; }) => {
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

export const logout = () => (dispatch: any) => {
    authAPI.logout().then((data: { resultCode: number; }) => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    })
};

export const getCaptchaUrl = () => (dispatch: any) => {
    securityAPI.captchaUrl().then((data: { url: string; }) => {
            dispatch(setCaptchaSuccess(data.url))
    })
};

export default AuthReducer;