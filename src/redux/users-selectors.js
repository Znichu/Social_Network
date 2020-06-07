export const getUsers = (state) => {
    return state.usersPage.users
};

export const getTotalPageCount = (state) => {
    return state.usersPage.totalPageCount
};

export const getTotalCount = (state) => {
    return state.usersPage.totalCount
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
};

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
};

export const getFollowInProgress = (state) => {
    return state.usersPage.followInProgress
};