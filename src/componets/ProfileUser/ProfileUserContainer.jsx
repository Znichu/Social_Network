import React from "react";
import {connect} from "react-redux";
import ProfileUser from "./ProfileUser";
import * as axios from "axios";
import {setProfileUser} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";



class ProfileUserContainer extends React.Component {

    userId = this.props.match.params.userId;

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/profile/" + this.userId)
            .then(response => {
                this.props.setProfileUser(response.data);
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