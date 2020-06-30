import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getMyProfile, setMyStatus} from "./myProfile-reducer";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";

const SET_AUTH_DATA = "SET_AUTH_DATA";
const SET_CAPTCHA_URL_SUCCESS = "SET_CAPTCHA_URL_SUCCESS";

type InitialStateType = {
    userId: number | null
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

const AuthReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_CAPTCHA_URL_SUCCESS:
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
};

type ActionsTypes = SetAuthUserDataType | SetCaptchaSuccessType
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>


type PayloadType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}
type SetAuthUserDataType = {
    type: typeof SET_AUTH_DATA
    payload: PayloadType
}
export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean):
    SetAuthUserDataType => ({type: SET_AUTH_DATA, payload: {userId, login, email, isAuth}});

type SetCaptchaSuccessType = {
    type: typeof SET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}
export const setCaptchaSuccess = (captchaUrl: string):
    SetCaptchaSuccessType => ({type: SET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const setAuth = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.getAuth();
        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(getMyProfile(id));
            dispatch(setAuthUserData(id, login, email, true));
            dispatch(setMyStatus(id));
        }
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType =>
    async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            await dispatch(setAuth())
        } else {
            if (data.resultCode === 10) {
                await dispatch(getCaptchaUrl())
            }
            let message = data.messages[0];
            // @ts-ignore
            dispatch(stopSubmit("login", {_error: message}))
        }
    };

export const logout = (): ThunkType =>
    async (dispatch) => {
        let data = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    };

export const getCaptchaUrl = (): ThunkType =>
    async (dispatch) => {
        let data = await securityAPI.captchaUrl();
        dispatch(setCaptchaSuccess(data.url))
    };

export default AuthReducer;