import React from "react";
import {connect} from "react-redux";
import {savePhoto, saveProfile, updateMyStatus} from "../../redux/myProfile-reducer";
import MyProfile from "./MyProfile";


class ProfileContainer extends React.Component {

    render() {
        if (!this.props.isAuth) {
            return <></>
        }
        return (
            <MyProfile {...this.props} />
        );
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    status: state.myProfile.status,
    profile: state.myProfile.profile
});


export default connect (mapStateToProps, { updateMyStatus, savePhoto, saveProfile }) (ProfileContainer);