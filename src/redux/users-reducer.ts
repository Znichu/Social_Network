import {followAPI, usersAPI} from "../api/api";
import {UserType} from "../type/types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOW_PROGRESS = "TOGGLE_IS_FOLLOW_PROGRESS";


let initialState = {
    users: [] as Array<UserType>,
    totalPageCount: 5,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followInProgress: [] as Array<number> // array of users id
};

type InitialStateType = typeof initialState;

const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        case SET_USERS:
            return {...state, users: action.users};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.numberPage};
        case SET_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_IS_FOLLOW_PROGRESS:
            return {
                ...state,
                followInProgress: action.isFetching
                    ? [...state.followInProgress, action.userId]
                    : state.followInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;

    }
};

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType
    | SetTotalCountActionType | ToggleIsFetchingActionType | FollowingInProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    numberPage: number
}
export const setCurrentPage = (numberPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, numberPage});
type SetTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalCount = (totalCount: number): SetTotalCountActionType => ({type: SET_TOTAL_COUNT, totalCount});
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});
type FollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOW_PROGRESS
    isFetching: boolean
    userId: number
}
export const followingInProgress = (isFetching: boolean, userId: number): FollowingInProgressActionType => ({
    type: TOGGLE_IS_FOLLOW_PROGRESS,
    isFetching,
    userId
});


type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>

export const requestUsers = (currentPage: number, totalPageCount: number): ThunkType =>
    async (dispatch) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(currentPage, totalPageCount);
        dispatch(setUsers(data.items));
        dispatch(toggleIsFetching(false));
        dispatch(setTotalCount(data.totalCount))
    };

export const follow = (userId: number): ThunkType =>
    async (dispatch: any) => {
        dispatch(followingInProgress(true, userId))
        let data = await followAPI.follow(userId);
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId))
        }
        dispatch(followingInProgress(false, userId))
    };

export const unfollow = (userId: number): ThunkType =>
    async (dispatch: any) => {
        dispatch(followingInProgress(true, userId))
        let data = await followAPI.unfollow(userId);
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(followingInProgress(false, userId))
    };


export default UsersReducer;