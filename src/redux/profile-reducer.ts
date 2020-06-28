import {profileAPI} from "../api/api";
import {ProfileType} from "../type/types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";

const SET_PROFILE_USER = "SET_PROFILE_USER";
const SET_STATUS = "SET_STATUS";


const initialState = {
    profile: null as ProfileType | null,
    status: ''
};
type InitialStateType = typeof initialState;

const ProfileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_PROFILE_USER: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}


type ActionsTypes = SetProfileUserActionType | SetStatusUserActionType

type SetProfileUserActionType = {
    type: typeof SET_PROFILE_USER
    profile: ProfileType
}
export const setProfileUser = (profile: ProfileType): SetProfileUserActionType => ({type: SET_PROFILE_USER, profile});
type SetStatusUserActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatusUser = (status: string): SetStatusUserActionType => ({type: SET_STATUS, status});


type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>

export const setProfile = (userId: number): ThunkType => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setProfileUser(data))
};

export const setStatus = (userId: number): ThunkType => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatusUser(data))
};

export default ProfileReducer;