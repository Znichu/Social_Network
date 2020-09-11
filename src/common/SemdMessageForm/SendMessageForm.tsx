import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/Validation/FieldValidationForm";
import {Textarea} from "../FormsControls/FormsControls";
import style from "./SendMessageForm.module.css"
import {CustomButton} from "../CustomButton/CustomButton";

export type AddMessageFormType = {
    addMessageBody: string
}

const sendMessageReduxForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={style.sendMessageForm}>
            <Field
                validate={[required]}
                placeholder='Ваше сообщение...'
                name="addMessageBody"
                component={Textarea} />
            <div className={style.sendBtn}>
                <CustomButton title={"Send"} />
            </div>
            </div>
        </form>
    );
};

export const SendMessageForm = reduxForm<AddMessageFormType> ({ form: 'addMessageDialog'}) (sendMessageReduxForm);