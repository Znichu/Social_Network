import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/Validation/FieldValidationForm";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/messages-reducer";
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

    let addNewMessage = (values: AddMessageFormType) => {
        dispatch(actions.addMessage(values.addMessageBody));
    };

    return (
        <div className="container" style={{paddingBottom: "25px"}}>
            <div className="row">
                <div className="col-lg-12">
                    <div className={style.dialogs}>
                        {dialogsElement}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col lg-12">
                    <div className={style.messages}>
                        {messagesElement}
                    </div>
                    <div className={style.enterMessage}>
                        <AddMessageFormRedux onSubmit={addNewMessage}/>
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
                <div className={style.send}>
                    <button className="btn btn-primary">Отправить</button>
                </div>
        </form>
    );
};

const AddMessageFormRedux = reduxForm<AddMessageFormType> ({ form: 'addMessageDialog'}) (AddMessageForm);
