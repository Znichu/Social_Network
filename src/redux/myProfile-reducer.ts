import {PhotosType, ProfileType} from "../type/types";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootState} from "./redux-store";
import {profileAPI} from "../api/profileApi";

let initialState = {
    status: '',
    profile: null as ProfileType | null
};

//Reducer
export const myProfileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/MYPROFILE/SET_MY_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "SN/MYPROFILE/SET_MY_PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }
        case "SN/MYPROFILE/SET_MY_PHOTO": {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
};

//Actions
export const actions = {
    setMyProfileStatus: (status: string) => ({type: "SN/MYPROFILE/SET_MY_STATUS", status} as const ),
    setMyProfile: (profile: ProfileType) => ({type: "SN/MYPROFILE/SET_MY_PROFILE", profile} as const ),
    setMyPhoto: (photos: PhotosType) => ({type: "SN/MYPROFILE/SET_MY_PHOTO", photos} as const )
}

//Thunk
export const setMyStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getStatus(userId);
        dispatch(actions.setMyProfileStatus(data))
    };
export const getMyProfile = (userId: number | null): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getProfile(userId);
        dispatch(actions.setMyProfile(data))
    };
export const updateMyStatus = (status: string): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setMyProfileStatus(status));
        }
    };
export const savePhoto = (file: File): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(actions.setMyPhoto(response.data.data.photos));
        }
    };
export const saveProfile = (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let data = await profileAPI.saveProfile(profile);
        if (data.resultCode === 0) {
            await dispatch(getMyProfile(userId))
        }
    };

//Types
type InitialStateType = typeof initialState;
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>
type ActionsTypes = InferActionTypes<typeof actions>