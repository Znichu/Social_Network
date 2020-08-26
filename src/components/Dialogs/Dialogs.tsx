import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/Validation/FieldValidationForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";


type AddMessageFormType = {
    addMessageBody: string
}

export const Dialogs: React.FC = () => {

    const { dialogs, messages } = useSelector( (state: RootState) => state.messagesPage )

    const dispatch = useDispatch()

    let dialogsElement =
        dialogs.map(p => <DialogItem key={p.id} name={p.name} id={p.id} />);

    let messagesElement =
        messages.map(m => <MessageItem key={m.id} message={m.message} />);

    let addMessage = (values: AddMessageFormType) => {
        dispatch(addMessage(values));
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

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
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

const AddMessageFormRedux = reduxForm<AddMessageFormType> ({ form: 'addMessageDialog'}) (AddMessageForm);
