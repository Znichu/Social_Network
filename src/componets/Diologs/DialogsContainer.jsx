import React from "react";
import {addMessageActionCreator, onMessageChangeActionCreator} from "../../redux/messages-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


// const DialogsContainer = (props) => {
//     let state = props.store.getState();
//
//     let sendNewMessage = () => { //отправка сообщения
//         props.store.dispatch(addMessageActionCreator());
//     };
//
//     let onMessageChange = (text) => {
//         let action = onMessageChangeActionCreator(text);
//         props.store.dispatch(action);
//     };
//
//
//     return ( <Dialogs
//         sendNewMessage={sendNewMessage}
//         onMessageChange={onMessageChange}
//         dialogs={state.messagesPage.dialogs}
//         newMessageText={state.messagesPage.newMessageText}
//         messages={state.messagesPage.messages}
//     /> );
// }


let mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
        newMessageText: state.messagesPage.newMessageText,
        messages: state.messagesPage.messages
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage: () => { //отправка сообщения
            dispatch(addMessageActionCreator());
        },
        onMessageChange: (text) => {
            let action = onMessageChangeActionCreator(text);
            dispatch(action);
        }
    }
};

 const DialogsContainer = connect (mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;