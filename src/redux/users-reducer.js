import {followAPI, usersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOW_PROGRESS = "TOGGLE_IS_FOLLOW_PROGRESS";


let initialState = {
    users : [ ],
    totalPageCount: 5,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followInProgress: []
};

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u =>  {
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
                    ?[...state.followInProgress, action.userId]
                    : state.followInProgress.filter(id => id !== action.userId)
            };
        default:
            return  state;

    }
};

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (numberPage) => ({type: SET_CURRENT_PAGE, numberPage});
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const followingInProgress = (isFetching, userId) => ({type:TOGGLE_IS_FOLLOW_PROGRESS, isFetching, userId});

export const getUsers = (currentPage, totalPageCount) => {
    return (dispatch) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, totalPageCount).then(data => {
            dispatch(setUsers(data.items));
            dispatch(toggleIsFetching(false));
            dispatch(setTotalCount(data.totalCount))
        });
    }
};

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgress(true, userId));
        followAPI.follow(userId)
            .then( data => {
                if (  data.resultCode === 0 ) {
                    dispatch(followSuccess(userId));
                }
                dispatch(followingInProgress(false, userId));
            });
    }
};

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgress(true, userId));
        followAPI.unfollow(userId)
            .then( data => {
                if (  data.resultCode === 0 ) {
                    dispatch(unfollowSuccess(userId));
                }
                dispatch(followingInProgress(false, userId));
            });
    }
};


export default UsersReducer;