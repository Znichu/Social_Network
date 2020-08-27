import {DialogType, MessageType} from "../type/types";
import {InferActionTypes, RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {dialogsApi} from "../api/dialogsApi";

const initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hello.'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'I\'m fine.'},
        {id: 4, message: 'What you did now?'},
        {id: 5, message: 'Read book.'},
        {id: 6, message: 'Cool.'},
    ] as Array<MessageType>
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
        case "SN/DIALOGS/ADD_MESSAGE": {
            //сразу возвращаем новый объект
            //раскукоживаем стэйт, и записываем туда обнуленный инпут
            //делаем глубокую копию стэйта и сразу записываем туда новой сообщение
            return  {
              ...state,
              messages: [...state.messages, {id: 7, message: action.newMessageText}]
            };
        }
        default: return state;
    }
};

//Actions
export const actions = {
    setDialogs: (dialogs: Array<DialogType>) => ({type: 'SN/DIALOGS/SET_DIALOGS', dialogs } as const),
    addMessage: (newMessageText: string) => ( {type: 'SN/DIALOGS/ADD_MESSAGE', newMessageText} as const )
}
//Thunk
export const requestDialogs = (): ThunkType => async (dispatch) => {
    try {
        const data = await dialogsApi.getDialogs()
        dispatch(actions.setDialogs(data))
    } catch (e) {
        console.log(e.message)
    }
}
export const getMessagesFriend = (userId: number): ThunkType => async (dispatch) => {
    try {
        const data = await dialogsApi.getFriendListMessages(userId)
    } catch (e) {
        console.log(e.message)
    }
}

//Types
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsType>
type InitialStateType = typeof initialState;
type ActionsType = InferActionTypes<typeof actions>