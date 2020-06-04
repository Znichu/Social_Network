import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout, setAuth} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {

        componentDidMount() {
            this.props.setAuth();
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

export default connect (mapStateToProps, {setAuth, logout}) (HeaderContainer);