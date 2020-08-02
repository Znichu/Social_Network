import {profileAPI} from "../api/api";
import {ProfileType} from "../type/types";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootState} from "./redux-store";

const initialState = {
    profile: null as ProfileType | null,
    status: ''
};

//Reducer
export const ProfileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/SET_PROFILE_USER": {
            return {
                ...state,
                profile: action.profile
            }
        }
        case "SN/PROFILE/SET_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}

//Actions
export const actions = {
    setProfileUser: (profile: ProfileType) => ({type: "SN/PROFILE/SET_PROFILE_USER", profile} as const),
    setStatusUser: (status: string) => ({type: "SN/PROFILE/SET_STATUS", status } as const)
}

//Thunk
export const setProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setProfileUser(data))
};

export const setStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatusUser(data))
};

//Types
type InitialStateType = typeof initialState
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>
type ActionsTypes = InferActionTypes<typeof actions>