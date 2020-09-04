import React from "react";
import style from './ProfileUser.module.css'
import camera from "../../assets/images/camera.jpeg";
import {ProfileType} from "../../type/types";
import {LinearProgress} from "@material-ui/core";

type PropsType = {
    profile: null | ProfileType
    status: string
}

const ProfileUser: React.FC<PropsType> = (props: PropsType) => {

    if (!props.profile) {
        return <LinearProgress />
    }
    return (
        <div className={style.wrapper}>
            <div className={style.profile}>
                <div className={style.avatar}>
                    <img src={props.profile.photos.large || camera} alt=""/>
                </div>
                <div className={style.fullName}>
                    <span>{props.profile.fullName}</span>
                </div>
                <div>
                    <span>{props.status}</span>
                </div>
                <div className={style.contact}>
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;