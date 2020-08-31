import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {InputLogin} from "../../common/FormsControls/FormsControls";
import style from "./Login.module.css"
import {required} from "../../utils/Validation/FieldValidationForm";
import {Redirect} from "react-router-dom";
import {RootState} from "../../redux/redux-store";

type OwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormPropsType, OwnPropsType> & OwnPropsType> = (props) => {

    return (
        <div className={style.loginForm}>
            <form onSubmit={props.handleSubmit}>
                {props.error &&
                <div className="alert alert-danger" role="alert">
                    {props.error}
                </div>
                }
                <div className="form-group">
                    <label><span>Login</span></label>
                    <Field
                        validate={[required]}
                        type={"email"}
                        component={InputLogin}
                        name={"email"}/>
                </div>
                <div className="form-group">
                    <label><span>Password</span></label>
                    <Field
                        validate={[required]}
                        type={"password"}
                        component={InputLogin}
                        name={"password"}/>
                </div>
                <div className="form-group form-check">
                    <Field
                        type={"checkbox"}
                        component="input"
                        name={"rememberMe"}
                        className="form-check-input"
                    />
                    <label className="form-check-label">Remember me</label>
                </div>
                {props.captchaUrl &&
                <div className="form-group">
                    <div className={style.captchaImg}>
                        <img src={props.captchaUrl} alt="captcha"/>
                    </div>
                    <Field
                        type={"text"}
                        validate={[required]}
                        component={InputLogin}
                        name={"captcha"}/>
                </div>
                }
                <div>
                    <button className="btn btn-primary">Sing In</button>
                </div>
            </form>
        </div>
    );
};

const LoginReduxForm = reduxForm<LoginFormPropsType, OwnPropsType>({form: 'login'})(LoginForm);

type LoginFormPropsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export const Login: React.FC = () => {

    const {isAuth, captchaUrl} = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()

    const onSubmit = (values: LoginFormPropsType) => {
        dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
    };

    if (isAuth) {
        return <Redirect to={"/myprofile"}/>
    }
    return (
        <div className={style.login}>
            <h2 className={style.title}>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
}