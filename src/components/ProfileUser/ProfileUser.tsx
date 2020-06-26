import React from "react";
import style from './ProfileUser.module.css'
import Preloader from "../../common/Preloader/Preloader";
import defaultImg from "../../assets/images/GAN-LOGO-NOTEXT-1-1024x1020.png";
import {ProfileType} from "../../type/types";

type PropsType = {
    profile: null | ProfileType
    status: string
}

const ProfileUser: React.FC<PropsType> = (props: PropsType) => {

    if (!props.profile) {
        return <div> <Preloader /> </div>
    }
    return (
        <div className={style.wrapper}>
            <div className={style.profile}>
                <div className={style.avatar}>
                    <img src={props.profile.photos.large || defaultImg} alt=""/>
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