import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setMyStatus, updateMyStatus} from "../../redux/myProfile-reducer";


class ProfileContainer extends React.Component {

    componentDidMount() {
        // let id = this.props.id ? this.props.id : 8204;
        this.props.setMyStatus(this.props.id);
    }
    render() {
        return (
            <Profile {...this.props} />
        );
    }
}

let mapStateToProps = (state) => ({
    id: state.auth.userId,
    status: state.myProfile.status
});


export default connect (mapStateToProps, { setMyStatus, updateMyStatus }) (ProfileContainer);