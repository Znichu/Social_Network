import React from "react";
import {connect} from "react-redux";
import {setMyStatus, updateMyStatus} from "../../redux/myProfile-reducer";
import ProfileHook from "./ProfileHook";


class ProfileContainer extends React.Component {

    render() {
        if (!this.props.isAuth) {
            return <></>
        }

        return (
            <ProfileHook {...this.props} />
        );
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    status: state.myProfile.status
});


export default connect (mapStateToProps, { setMyStatus, updateMyStatus }) (ProfileContainer);