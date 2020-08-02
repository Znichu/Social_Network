import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getMyProfile, setMyStatus} from "./myProfile-reducer";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootState} from "./redux-store";

let initialState = {
    userId: null as (number | null),
    email: null as (null | string),
    login: null as (null | string),
    isAuth: false,
    captchaUrl: null as (null | string)
};

//Reducer
export const AuthReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/AUTH/SET_AUTH_DATA":
        case  "SN/AUTH/SET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
};

//Actions
export const actions = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) =>
        ({type: "SN/AUTH/SET_AUTH_DATA", payload: {userId, login, email, isAuth}} as const),
    setCaptchaSuccess: (captchaUrl: string) => ({
        type: "SN/AUTH/SET_CAPTCHA_URL_SUCCESS",
        payload: {captchaUrl}
    } as const)
}


//Thunk
export const setAuth = (): ThunkType => async (dispatch) => {
    let data = await authAPI.getAuth();
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(getMyProfile(id));
        dispatch(actions.setAuthUserData(id, login, email, true));
        dispatch(setMyStatus(id));
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

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.captchaUrl();
    dispatch(actions.setCaptchaSuccess(data.url))
};

//Types
type InitialStateType = typeof initialState
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsType>
type ActionsType = InferActionTypes<typeof actions>