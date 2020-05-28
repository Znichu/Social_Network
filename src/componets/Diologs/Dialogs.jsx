import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";



const Dialogs = (props) => {

    let dialogsElement =
        props.dialogs.map(p => <DialogItem name={p.name} id={p.id} />);

    let messagesElement =
        props.messages.map(m => <MessageItem message={m.message} />);

    let addMessage = (values) => {
        props.addMessage(values.addMessageBody);
    };


    return (
        <div className="container" style={{paddingBottom: "25px"}}>
            <div className="row">
                <div className="col-lg-12">
                    <div className={s.dialogs}>
                        {dialogsElement}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col lg-12">
                    <div className={s.messages}>
                        {messagesElement}
                    </div>
                    <div className={s.enterMessage}>
                        <AddMessageFormRedux onSubmit={addMessage}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={s.actionBoxInput} placeholder='Ваше сообщение...' name="addMessageBody" component="textarea" />
            <button  className={s.send}>Send</button>
        </form>
    );
};

const AddMessageFormRedux = reduxForm ({ form: 'addMessageDialog'}) (AddMessageForm);

export default Dialogs;