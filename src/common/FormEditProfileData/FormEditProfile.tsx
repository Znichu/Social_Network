import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import style from "./FormEditProfile.module.css";
import {InputLogin, Textarea} from "../FormsControls/FormsControls";
import {ProfileType} from "../../type/types";
import {CustomButton} from "../CustomButton/CustomButton";


const FormEditProfile: React.FC<InjectedFormProps<ProfileType>> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={style.fullName}>
                <label>Full name: </label>
                <Field
                    type={"input"}
                    component={InputLogin}
                    name={"fullName"}
                    className="form-check-input"
                />
            </div>
            <div className={style.aboutMe}>
                <label>About me:</label>
                <Field
                    component={Textarea}
                    name={"aboutMe"}
                    className="form-check-input"
                />
            </div>
            <div className={style.lookingForAJob}>
                <label>Looking for a job:</label>
                <Field
                    type={"checkbox"}
                    component="input"
                    name={"lookingForAJob"}
                />
            </div>
            <div className={style.description}>
                <label>My professional skills: </label>
                <Field
                    component={Textarea}
                    name={"lookingForAJobDescription"}
                    className="form-check-input"
                />
            </div>
            <div className={style.saveBtn}>
                <CustomButton title={'Save'}/>
            </div>
        </form>
    );
}

const FormEditProfileReduxForm = reduxForm<ProfileType>({form: "edit-profile"})(FormEditProfile);

export default FormEditProfileReduxForm