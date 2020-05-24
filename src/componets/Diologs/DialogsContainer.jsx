import React from "react";
import {addMessageActionCreator, onMessageChangeActionCreator} from "../../redux/messages-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withRedirect} from "../../hoc/hoc";



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

let Redirect = withRedirect(Dialogs);

const DialogsContainer = connect (mapStateToProps, mapDispatchToProps)(Redirect);

export default DialogsContainer;