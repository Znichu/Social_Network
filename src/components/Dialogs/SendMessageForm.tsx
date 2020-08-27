import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/Validation/FieldValidationForm";
import {Textarea} from "../../common/FormsControls/FormsControls";
import style from "./Dialogs.module.css";

export type AddMessageFormType = {
    addMessageBody: string
}

const sendMessageReduxForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
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

export const SendMessageForm = reduxForm<AddMessageFormType> ({ form: 'addMessageDialog'}) (sendMessageReduxForm);