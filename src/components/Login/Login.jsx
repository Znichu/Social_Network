import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {InputLogin} from "../../common/FormsControls/FormsControls";
import style from "./Login.module.css"
import {required} from "../../utils/Validation/FieldValidationForm";
import {Redirect} from "react-router-dom";
import {RootState} from "../../redux/redux-store";



const LoginForm = (props) => {

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

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = (props) => {
    let onSubmit = (values) => {
        props.login(values.email, values.password, values.rememberMe, values.captcha);
    };

    if (props.isAuth) {
        return <Redirect to={"/myposts"}/>
    }

    return (
        <div className={style.login}>
            <h2 className={style.title}>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

let mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);