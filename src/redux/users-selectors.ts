import {RootState} from "./redux-store";

export const getUsers = (state: RootState) => {
    return state.usersPage.users
};

export const getTotalPageCount = (state: RootState) => {
    return state.usersPage.totalPageCount
};

export const getTotalCount = (state: RootState) => {
    return state.usersPage.totalCount
};

export const getCurrentPage = (state: RootState) => {
    return state.usersPage.currentPage
};

export const getIsFetching = (state: RootState) => {
    return state.usersPage.isFetching
};

export const getFollowInProgress = (state: RootState) => {
    return state.usersPage.followInProgress
};