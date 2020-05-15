import React from "react";
import style from './ProfileUser.module.css'
import Preloader from "../../common/Preloader/Preloader";


const ProfileUser = (props) => {

    if (!props.profile) {
        return <div> <Preloader /> </div>
    }
    return (
        <div className={style.wrapper}>
            <div className={style.profile}>
                <div className={style.avatar}>
                    <img src={props.profile.photos.small} alt=""/>
                </div>
                <div className={style.fullName}>
                    <span>{props.profile.fullName}</span>
                </div>
                <div className={style.contact}>
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;