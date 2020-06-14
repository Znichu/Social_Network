import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {InputLogin} from "../../common/FormsControls/FormsControls";
import style from "./Login.module.css"
import {required} from "../../utils/Validation/FieldValidationForm";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {

    return (
        <div className={style.loginForm}>
            <form onSubmit={props.handleSubmit}>
                { props.error &&
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
                <div>
                    <button className="btn btn-primary">Sing In</button>
                </div>
            </form>
        </div>
    );
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    let onSubmit = (value) => {
        props.login(value.email, value.password, value.rememberMe)
    };

    if (props.isAuth) {
        return <Redirect to={"/myposts"}/>
    }

    return (
        <div className={style.login}>
            <h2 className={style.title}>Login</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);