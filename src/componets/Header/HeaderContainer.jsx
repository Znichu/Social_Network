import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component {

        componentDidMount() {
            authAPI.getAuth().then(data => {
                    if (data.resultCode === 0) {
                        let {id, login, email} = data.data;
                        return this.props.setAuthUserData(id, login, email);
                    }
                });
        }

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
});

export default connect (mapStateToProps, {setAuthUserData}) (HeaderContainer);