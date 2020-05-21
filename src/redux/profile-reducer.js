import {profileAPI} from "../api/api";

const SET_PROFILE_USER = "SET_PROFILE_USER";


let initialState = {
    profile: null
};


const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_USER: {
            return {...state, profile: action.profile}
        }
        default: return state
    }
};

export const setProfileUser = (profile) => ({type:SET_PROFILE_USER, profile});

export const setProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
            .then(data => {
                dispatch(setProfileUser(data));
            });
    }
};

export default ProfileReducer;