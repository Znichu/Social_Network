import {UserType} from "../type/types";
import {InferActionTypes, RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/usersApi";


let initialState = {
    totalPageCount: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    friends: [] as Array<UserType>
};


//Reducer
export const friendsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SN/FRIENDS/SET_MY_FRIENDS_LIST": {
            return {
                ...state,
                friends: state.friends.concat(action.friends),
                totalCount: action.totalCount
            }
        }
        case "SN/FRIENDS/TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case "SN/FRIENDS/ADVANCE_PAGE": {
            return {
                ...state,
                currentPage: state.currentPage + 1
            }
        }
        default:
            return state
    }
}

//Actions
export const actions = {
    setMyFriendsList: (friends: UserType[], totalCount: number) => ({type: 'SN/FRIENDS/SET_MY_FRIENDS_LIST', friends, totalCount} as const),
    serCurrentPage: () => ({type: 'SN/FRIENDS/ADVANCE_PAGE'} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/FRIENDS/TOGGLE_IS_FETCHING', isFetching} as const ),
}
//Thunk
export const requestFriends = (): ThunkType => async (dispatch, getState) => {
    const {currentPage, totalPageCount} = getState().friendsBlock
    try {
        dispatch(actions.toggleIsFetching(true))
        const data = await usersAPI.getUsers(currentPage, totalPageCount, '', true)
        dispatch(actions.setMyFriendsList(data.items, data.totalCount))
    } catch (e) {
        console.log(e)
    }
    dispatch(actions.toggleIsFetching(false))
}

export default friendsReducer;
//Types
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionType>
type ActionType = InferActionTypes<typeof actions>
type InitialStateType = typeof initialState;
