import {DialogType, MessageType} from "../type/types";
import {InferActionTypes, RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {dialogsApi} from "../api/dialogsApi";
import {getIsFetching} from "./users-selectors";

const initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>,
    isFetching: false
};

//Reducer
export const MessageReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "SN/DIALOGS/SET_DIALOGS": {
            return {
                ...state,
                dialogs: action.dialogs
            }
        }
        case "SN/DIALOGS/SET_FRIEND_MESSAGES": {
            return {
                ...state,
                messages: action.messagesList
            }
        }
        case "SN/DIALOGS/TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default: return state;
    }
};

//Actions
export const actions = {
    setDialogs: (dialogs: Array<DialogType>) => ({type: 'SN/DIALOGS/SET_DIALOGS', dialogs } as const),
    setFriendMessages: (messagesList: Array<MessageType>) => ({type: 'SN/DIALOGS/SET_FRIEND_MESSAGES', messagesList } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/DIALOGS/TOGGLE_IS_FETCHING', isFetching} as const)
}
//Thunk
export const requestDialogs = (): ThunkType => async (dispatch) => {
    try {
        const data = await dialogsApi.getDialogs()
        dispatch(actions.setDialogs(data))
    } catch (e) {
        console.log(e)
    }
}
export const getMessagesFriend = (userId: number): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true))
        const data = await dialogsApi.getFriendListMessages(userId)
        dispatch(actions.setFriendMessages(data.items))
    } catch (e) {
        console.log(e)
    }
    dispatch(actions.toggleIsFetching(false))
}
export const sendNewMessage = (userId: number, body: string): ThunkType => async (dispatch, getState) => {
    try {
        await dialogsApi.sendMessage(userId, body)
        await dispatch(getMessagesFriend(userId))
    } catch (e) {
        console.log(e)
    }
}


//Types
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsType>
type InitialStateType = typeof initialState;
type ActionsType = InferActionTypes<typeof actions>