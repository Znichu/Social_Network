import React from "react";
import style from './ProfileUser.module.css'
import camera from "../../assets/images/camera.jpeg";
import {ProfileType} from "../../type/types";
import {LinearProgress} from "@material-ui/core";
import {Loading} from "../../common/Loading/Loading";

type PropsType = {
    profile: null | ProfileType
    status: string
}

const ProfileUser: React.FC<PropsType> = (props) => {

    if (!props.profile) {
        return <Loading/>
    }
    return (
        <div className={style.wrapper}>
            <div className={style.profile}>
                <div className={style.profileAvatar}>
                    <img src={props.profile.photos.large || camera} alt=""/>
                </div>
                <div className={style.profileInfo}>
                    <div className={style.profileInfo__title}>
                        <div>
                            <h4>{props.profile.fullName}</h4>
                        </div>
                        <div>
                            <span>{props.status}</span>
                        </div>
                    </div>

                    <hr/>
                    <div className={style.profileInfo__description}>
                    <div>
                        <span><b>About me:</b> {props.profile?.aboutMe}</span>
                    </div>
                    <div>
                        <span><b>Looking for a job:</b> {props.profile?.lookingForAJob ? "Yes": "No"}</span>
                    </div>
                    <div>
                        <span><b>My professional skills:</b> {props.profile?.lookingForAJobDescription} </span>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfileUser;