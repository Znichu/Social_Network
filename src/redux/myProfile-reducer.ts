import {profileAPI} from "../api/api";
import {PhotosType, ProfileType} from "../type/types";

const SET_MY_STATUS = "SET_MY_STATUS";
const SET_MY_PHOTO = "SET_MY_PHOTO";
const SET_MY_PROFILE = "SET_MY_PROFILE";


let initialState = {
    status: "",
    profile: null as ProfileType | null
};
type InitialStateType = typeof initialState;


const myProfileReducer = (state = initialState, action: any): InitialStateType => {
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

type SetMyProfileStatusActionType = {
    type: typeof SET_MY_STATUS
    status: string
}
export const setMyProfileStatus = (status: string): SetMyProfileStatusActionType => ({type: SET_MY_STATUS, status});
type SetMyProfileActionType ={
    type: typeof SET_MY_PROFILE
    profile: ProfileType
}
export const setMyProfile = (profile: ProfileType): SetMyProfileActionType => ({type: SET_MY_PROFILE, profile});
type SetMyPhotoActionTYpe = {
    type: typeof SET_MY_PHOTO
    photos: PhotosType
}
export const setMyPhoto = (photos: PhotosType): SetMyPhotoActionTYpe => ({type: SET_MY_PHOTO, photos});

export const setMyStatus = (userId: number) => (dispatch: any) => {
    profileAPI.getStatus(userId)
        .then((data: string) => {
            dispatch(setMyProfileStatus(data));
        })
};
export const getMyProfile = (userId: number) => (dispatch: any) => {
    profileAPI.getProfile(userId)
        .then((data: any) => {
            dispatch(setMyProfile(data));
        });
};
export const updateMyStatus = (status: string) => (dispatch: any) => {
    profileAPI.updateStatus(status)
        .then((response: { data: { resultCode: number; }; }) => {
            if (response.data.resultCode === 0) {
                dispatch(setMyProfileStatus(status));
            }
        })
};
export const savePhoto = (file: any) => (dispatch: any) => {
    profileAPI.savePhoto(file)
        .then((response: { data: { resultCode: number; data: { photos: any; }; }; }) => {
            if (response.data.resultCode === 0) {
                dispatch(setMyPhoto(response.data.data.photos));
            }
        })
};
export const saveProfile = (profile: ProfileType) => (dispatch: any, getState:any) => {
    const userId = getState().auth.userId;
    profileAPI.saveProfile(profile)
        .then((response: { data: { resultCode: number; }; }) => {
            if (response.data.resultCode === 0) {
                dispatch(getMyProfile(userId))
            }
        })
};

export default myProfileReducer;