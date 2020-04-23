const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Serg'},
        {id: 3, name: 'Juliya'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Lena'}
    ],
    messages: [
        {id: 1, message: 'Hello.'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'I\'m fine.'},
        {id: 4, message: 'What you did now?'},
        {id: 5, message: 'Read book.'},
        {id: 6, message: 'Cool.'},
    ],
    newMessageText: ''
};

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 7,
                message: state.newMessageText
            };
            state.messages.push(newMessage);
            state.newMessageText = '';
            return state;
        case  UPDATE_MESSAGE_TEXT:
            state.newMessageText = action.newTextMessage;
            return state;
        default:
            return state;
    }
};


export const addMessageActionCreator = () => ( {type: ADD_MESSAGE} );
export const onMessageChangeActionCreator = (text) => ( {type: UPDATE_MESSAGE_TEXT, newTextMessage: text} );

export default MessageReducer;