import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {RootState} from "../../redux/redux-store";

type MapStatePropsType = {
    login: null | string
    isAuth: boolean
}

type MapDispatchPropsType = {
    logout: () => void
}

type Props = MapStatePropsType & MapDispatchPropsType;
class HeaderContainer extends React.Component<Props> {

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state: RootState): MapStatePropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {logout}) (HeaderContainer);