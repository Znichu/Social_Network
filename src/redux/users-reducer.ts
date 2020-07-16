import {followAPI, usersAPI} from "../api/api";
import {UserType} from "../type/types";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootState} from "./redux-store";

let initialState = {
    users: [] as Array<UserType>,
    totalPageCount: 5,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followInProgress: [] as Array<number> // array of users id
};

const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/USERS/FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case "SN/USERS/UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        case "SN/USERS/SET_USERS":
            return {...state, users: action.users};
        case "SN/USERS/SET_CURRENT_PAGE":
            return {...state, currentPage: action.numberPage};
        case "SN/USERS/SET_TOTAL_COUNT":
            return {...state, totalCount: action.totalCount};
        case "SN/USERS/TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching};
        case "SN/USERS/TOGGLE_IS_FOLLOW_PROGRESS":
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


//Actions
const actions = {
    followSuccess: (userId: number) => ({type: "SN/USERS/FOLLOW", userId} as const),
    unfollowSuccess: (userId: number) => ({type: "SN/USERS/UNFOLLOW", userId} as const ),
    setUsers: (users: Array<UserType>) => ({type: "SN/USERS/SET_USERS", users} as const ),
    setCurrentPage: (numberPage: number) => ({type: "SN/USERS/SET_CURRENT_PAGE", numberPage} as const ),
    setTotalCount: (totalCount: number) => ({type: "SN/USERS/SET_TOTAL_COUNT", totalCount} as const ),
    toggleIsFetching: (isFetching: boolean) => ({type: "SN/USERS/TOGGLE_IS_FETCHING", isFetching} as const ),
    followingInProgress: (isFetching: boolean, userId: number) => ({type: "SN/USERS/TOGGLE_IS_FOLLOW_PROGRESS", isFetching, userId} as const )
}

//Thunk
export const requestUsers = (currentPage: number, totalPageCount: number): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(true));
        let data = await usersAPI.getUsers(currentPage, totalPageCount);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setTotalCount(data.totalCount))
    };

export const follow = (userId: number): ThunkType =>
    async (dispatch: any) => {
        dispatch(actions.followingInProgress(true, userId))
        let data = await followAPI.follow(userId);
        if (data.resultCode === 0) {
            dispatch(actions.followSuccess(userId))
        }
        dispatch(actions.followingInProgress(false, userId))
    };

export const unfollow = (userId: number): ThunkType =>
    async (dispatch: any) => {
        dispatch(actions.followingInProgress(true, userId))
        let data = await followAPI.unfollow(userId);
        if (data.resultCode === 0) {
            dispatch(actions.unfollowSuccess(userId));
        }
        dispatch(actions.followingInProgress(false, userId))
    };


export default UsersReducer;

//Type
type InitialStateType = typeof initialState;
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsTypes>
type ActionsTypes = InferActionTypes<typeof actions>