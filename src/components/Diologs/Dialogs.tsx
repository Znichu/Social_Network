import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/Validation/FieldValidationForm";
import {DialogType, MessageType} from "../../type/types";

type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addMessage: ( addMessageBody: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    let dialogsElement =
        props.dialogs.map(p => <DialogItem key={p.id} name={p.name} id={p.id} />);

    let messagesElement =
        props.messages.map(m => <MessageItem key={m.id} message={m.message} />);

    let addMessage = (values: any) => {
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

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                validate={[required]}
                placeholder='Ваше сообщение...'
                name="addMessageBody"
                component={Textarea} />
                <div className={s.send}>
                    <button className="btn btn-primary">Отправить</button>
                </div>
        </form>
    );
};

const AddMessageFormRedux = reduxForm ({ form: 'addMessageDialog'}) (AddMessageForm);

export default Dialogs;