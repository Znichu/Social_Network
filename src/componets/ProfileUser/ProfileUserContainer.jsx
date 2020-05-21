import React from "react";
import {connect} from "react-redux";
import ProfileUser from "./ProfileUser";
import {setProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";



class ProfileUserContainer extends React.Component {

    userId = this.props.match.params.userId;

    componentDidMount() {
        this.props.setProfile(this.userId);
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

export default connect (mapStateToProps, {setProfile})(UserIdDataContainer);