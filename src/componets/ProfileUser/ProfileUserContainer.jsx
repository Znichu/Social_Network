import React from "react";
import {connect} from "react-redux";
import ProfileUser from "./ProfileUser";
import * as axios from "axios";
import {setProfileUser} from "../../redux/profile-reducer";



class ProfileUserContainer extends React.Component {

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/profile/2")
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

export default connect (mapStateToProps, {setProfileUser})(ProfileUserContainer);