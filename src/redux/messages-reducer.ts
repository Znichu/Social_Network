import {DialogType, MessageType} from "../type/types";

const ADD_MESSAGE = "ADD-MESSAGE";


let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Serg'},
        {id: 3, name: 'Juliya'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Lena'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hello.'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'I\'m fine.'},
        {id: 4, message: 'What you did now?'},
        {id: 5, message: 'Read book.'},
        {id: 6, message: 'Cool.'},
    ] as Array<MessageType>
};

type InitialStateType = typeof initialState;

const MessageReducer = (state = initialState, action: AddMessageActionType): InitialStateType => {

    switch (action.type) {
        case ADD_MESSAGE: {
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

type AddMessageActionType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
}
export const addMessage = (newMessageText: string): AddMessageActionType => ( {type: ADD_MESSAGE, newMessageText} );


export default MessageReducer;