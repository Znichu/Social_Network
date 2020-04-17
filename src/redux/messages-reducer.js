const ADD_MESSAGE = "ADD_MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE_MESSAGE_TEXT";


const MessageReducer = (action, state) => {
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

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const onMessageChangeActionCreator = (text) => ( {type: UPDATE_MESSAGE_TEXT, newTextMessage: text} );

export default MessageReducer;