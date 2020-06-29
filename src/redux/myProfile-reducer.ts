import {profileAPI} from "../api/api";
import {PhotosType, ProfileType} from "../type/types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";

const SET_MY_STATUS = "SET_MY_STATUS";
const SET_MY_PHOTO = "SET_MY_PHOTO";
const SET_MY_PROFILE = "SET_MY_PROFILE";


let initialState = {
    status: "",
    profile: null as ProfileType | null
};
type InitialStateType = typeof initialState;


const myProfileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_MY_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_MY_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_MY_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
};

type ActionsTypes = SetMyProfileStatusActionType | SetMyProfileActionType | SetMyPhotoActionTYpe

type SetMyProfileStatusActionType = {
    type: typeof SET_MY_STATUS
    status: string
}
export const setMyProfileStatus = (status: string): SetMyProfileStatusActionType => ({type: SET_MY_STATUS, status});
type SetMyProfileActionType = {
    type: typeof SET_MY_PROFILE
    profile: ProfileType
}
export const setMyProfile = (profile: ProfileType): SetMyProfileActionType => ({type: SET_MY_PROFILE, profile});
type SetMyPhotoActionTYpe = {
    type: typeof SET_MY_PHOTO
    photos: PhotosType
}
export const setMyPhoto = (photos: PhotosType): SetMyPhotoActionTYpe => ({type: SET_MY_PHOTO, photos});


type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>

export const setMyStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getStatus(userId);
        dispatch(setMyProfileStatus(data))
    };
export const getMyProfile = (userId: number | null): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getProfile(userId);
        dispatch(setMyProfile(data))
    };
export const updateMyStatus = (status: string): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setMyProfileStatus(status));
        }
    };
export const savePhoto = (file: File): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(setMyPhoto(response.data.data.photos));
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

export default myProfileReducer;