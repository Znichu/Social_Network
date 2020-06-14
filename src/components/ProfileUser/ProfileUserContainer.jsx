import React from "react";
import {connect} from "react-redux";
import ProfileUser from "./ProfileUser";
import {setProfile, setStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";



class ProfileUserContainer extends React.Component {

    userId = this.props.match.params.userId;

    componentDidMount() {
        this.props.setProfile(this.userId);
        this.props.setStatus(this.userId);
    }
    render() {

        return (
            <ProfileUser {...this.props} profile={this.props.profile} status={this.props.status} />
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profileUser.profile,
    status: state.profileUser.status
});


export default compose(
    withRouter,
    connect (mapStateToProps, {setProfile, setStatus})
)(ProfileUserContainer);
