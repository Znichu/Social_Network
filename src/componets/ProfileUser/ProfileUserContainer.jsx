import React from "react";
import {connect} from "react-redux";
import ProfileUser from "./ProfileUser";
import * as axios from "axios";
import {setProfileUser} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {profileAPI} from "../../api/api";



class ProfileUserContainer extends React.Component {

    userId = this.props.match.params.userId;

    componentDidMount() {
        profileAPI.getProfile(this.userId)
            .then(data => {
                this.props.setProfileUser(data);
            });
    }
    render() {

        return (
            <ProfileUser {...this.props} profile={this.props.profile} />
        );
    }
}

let mapStateToProps = (state) => ({
        profile: state.profileUser.profile
});

let UserIdDataContainer = withRouter(ProfileUserContainer);

export default connect (mapStateToProps, {setProfileUser})(UserIdDataContainer);