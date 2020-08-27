import {DialogType, MessageType} from "../type/types";
import {InferActionTypes, RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {dialogsApi} from "../api/dialogsApi";

const initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>
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
/*        case "SN/DIALOGS/ADD_MESSAGE": {
            //сразу возвращаем новый объект
            //раскукоживаем стэйт, и записываем туда обнуленный инпут
            //делаем глубокую копию стэйта и сразу записываем туда новой сообщение
            return  {
              ...state,
              messages: [...state.messages, {id: 7, message: action.newMessageText}]
            };
        }*/
        default: return state;
    }
};

//Actions
export const actions = {
    setDialogs: (dialogs: Array<DialogType>) => ({type: 'SN/DIALOGS/SET_DIALOGS', dialogs } as const),
    addMessage: (newMessageText: string) => ( {type: 'SN/DIALOGS/ADD_MESSAGE', newMessageText} as const ),
    setFriendMessages: (messagesList: Array<MessageType>) => ({type: 'SN/DIALOGS/SET_FRIEND_MESSAGES', messagesList } as const)
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
        const data = await dialogsApi.getFriendListMessages(userId)
        dispatch(actions.setFriendMessages(data.items))
    } catch (e) {
        console.log(e)
    }
}
export const sendNewMessage = (userId: number, body: string): ThunkType => async (dispatch) => {
    try {
        const data = await dialogsApi.sendMessage(userId, body)
    } catch (e) {
        console.log(e)
    }
}


//Types
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsType>
type InitialStateType = typeof initialState;
type ActionsType = InferActionTypes<typeof actions>