import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {setLogin} from "../../redux/auth-reducer";

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label><span>Login</span></label>
                <Field type={"text"} component={"input"} name={"login"}/>
            </div>
            <div>
                <label><span>Password</span></label>
                <Field type={"text"} component={"input"} name={"password"}/>
            </div>
            <div>
                <Field type={"checkbox"} component={"input"} name={"rememberMe"}/> <span>remember me</span>
            </div>
            <div>
                <button onClick={ () => (setLogin('login'))} >Sing In</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({ form: 'login'})(LoginForm);

const Login = (props) => {
    let onSubmit = (value) => {
        console.log(value)
    };
    return (
       <div>
           <h2>Login</h2>
           <LoginReduxForm onSubmit={onSubmit} setLogin={props.setLogin}/>
       </div>
    );
};

export default connect (null, { setLogin }) (Login);