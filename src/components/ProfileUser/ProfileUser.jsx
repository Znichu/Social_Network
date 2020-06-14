import React from "react";
import style from './ProfileUser.module.css'
import Preloader from "../../common/Preloader/Preloader";
import defaultImg from "../../assets/images/GAN-LOGO-NOTEXT-1-1024x1020.png";


const ProfileUser = (props) => {

    if (!props.profile) {
        return <div> <Preloader /> </div>
    }
    return (
        <div className={style.wrapper}>
            <div className={style.profile}>
                <div className={style.avatar}>
                    <img src={props.profile.photos.large !== null ? props.profile.photos.large : defaultImg} alt=""/>
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