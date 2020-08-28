import {UserType} from "../type/types";
import {InferActionTypes, RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/usersApi";


let initialState = {
    totalPageCount: 6,
    totalCount: 0,
    currentPage: 1,
    friends: [] as Array<UserType>
};


//Reducer
export const friendsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SN/FRIENDS/SET_MY_FRIENDS_LIST": {
            return {
                ...state,
                friends: action.friends,
                totalCount: action.totalCount
            }
        }
        default:
            return state
    }
}

//Actions
const actions = {
    setMyFriendsList: (friends: UserType[], totalCount: number) => ({type: 'SN/FRIENDS/SET_MY_FRIENDS_LIST', friends, totalCount} as const)
}
//Thunk
export const requestFriends = (): ThunkType => async (dispatch, getState) => {
    const {currentPage, totalPageCount} = getState().friendsBlock
    try {
        const data = await usersAPI.getUsers(currentPage, totalPageCount, '', true)
        dispatch(actions.setMyFriendsList(data.items, data.totalCount))
    } catch (e) {
        console.log(e)
    }
}

export default friendsReducer;
//Types
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionType>
type ActionType = InferActionTypes<typeof actions>
type InitialStateType = typeof initialState;
