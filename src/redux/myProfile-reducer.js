import {profileAPI} from "../api/api";

const SET_MY_STATUS = "SET_MY_STATUS";

let initialState = {
    status: ""
};


const myProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state;
    }
};


export const setMyProfileStatus = (status) => ({type: SET_MY_STATUS, status});

export const setMyStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(data => {
            dispatch(setMyProfileStatus(data));
        })
};
export const updateMyStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setMyProfileStatus(status));
            }
        })
};

export default myProfileReducer;