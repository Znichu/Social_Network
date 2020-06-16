import {profileAPI} from "../api/api";

const SET_MY_STATUS = "SET_MY_STATUS";
const SET_MY_PHOTO = "SET_MY_PHOTO";
const SET_MY_PROFILE = "SET_MY_PROFILE";


let initialState = {
    status: "",
    profile: null
};


const myProfileReducer = (state = initialState, action) => {
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
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state;
    }
};


export const setMyProfileStatus = (status) => ({type: SET_MY_STATUS, status});
export const setMyProfile = (profile) => ({type: SET_MY_PROFILE, profile});
export const setMyPhoto = (photos) => ({type: SET_MY_PHOTO, photos});

export const setMyStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(data => {
            dispatch(setMyProfileStatus(data));
        })
};
export const getMyProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId)
        .then(data => {
            dispatch(setMyProfile(data));
        });
};
export const updateMyStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setMyProfileStatus(status));
            }
        })
};
export const savePhoto = (file) => (dispatch) => {
    profileAPI.savePhoto(file)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setMyPhoto(response.data.data.photos));
            }
        })
};
export const saveProfile = (profile) => (dispatch) => {
    profileAPI.saveProfile(profile)
        .then(response => {
            debugger
            if (response.data.resultCode === 0) {
            }
        })
};

export default myProfileReducer;