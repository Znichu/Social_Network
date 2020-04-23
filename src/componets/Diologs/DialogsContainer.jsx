import React from "react";
import {addMessageActionCreator, onMessageChangeActionCreator} from "../../redux/messages-reducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {
    let state = props.store.getState();

    let sendNewMessage = () => { //отправка сообщения
        props.store.dispatch(addMessageActionCreator());
    };

    let onMessageChange = (text) => {
        let action = onMessageChangeActionCreator(text);
        props.store.dispatch(action);
    };


    return ( <Dialogs
        sendNewMessage={sendNewMessage}
        onMessageChange={onMessageChange}
        dialogs={state.messagesPage.dialogs}
        newMessageText={state.messagesPage.newMessageText}
        messages={state.messagesPage.messages}
    /> );
}
export default DialogsContainer;