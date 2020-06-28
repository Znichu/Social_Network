import React from "react";
import {connect} from "react-redux";
import {savePhoto, saveProfile, updateMyStatus} from "../../redux/myProfile-reducer";
import MyProfile from "./MyProfile";
import {RootState} from "../../redux/redux-store";
import {ProfileType} from "../../type/types";

type PropsType = {
    isAuth: boolean
    status: string
    profile: ProfileType | null
    updateMyStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => void
}


class ProfileContainer extends React.Component<PropsType> {

    render() {
        if (!this.props.isAuth) {
            return <></>
        }
        return (
            <MyProfile {...this.props} />
        );
    }
}

let mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    status: state.myProfile.status,
    profile: state.myProfile.profile
});


export default connect (mapStateToProps, { updateMyStatus, savePhoto, saveProfile }) (ProfileContainer);