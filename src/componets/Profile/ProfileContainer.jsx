import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setMyStatus, updateMyStatus} from "../../redux/myProfile-reducer";


class ProfileContainer extends React.Component {

    render() {
        if (!this.props.isAuth) {
            return <></>
        }

        return (
            <Profile {...this.props} />
        );
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    status: state.myProfile.status
});


export default connect (mapStateToProps, { setMyStatus, updateMyStatus }) (ProfileContainer);