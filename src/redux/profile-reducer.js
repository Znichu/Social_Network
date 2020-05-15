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

export default ProfileReducer;