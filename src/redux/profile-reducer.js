import {profileAPI} from "../api/api";

const SET_PROFILE_USER = "SET_PROFILE_USER";
const SET_STATUS = "SET_STATUS";


let initialState = {
    profile: null,
    status: ""
};


const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_USER: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default: return state
    }
};

export const setProfileUser = (profile) => ({type:SET_PROFILE_USER, profile});
export const setStatusUser = (status) => ({type:SET_STATUS, status});

export const setProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
            .then(data => {
                dispatch(setProfileUser(data));
            });
    }
};

export const setStatus = (userId) => {
     return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(data => {
                dispatch(setStatusUser(data));
            });
    }
};

export default ProfileReducer;