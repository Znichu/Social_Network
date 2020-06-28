import React from "react";
import style from './MyProfile.module.css'

type PropsType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    activateEditProfile: () => void
}

const MyProfileInfo: React.FC<PropsType> = (props: PropsType) => {
    return (
        <>
            <div className={style.aboutMe}>
                <b>About me: </b> {props.aboutMe}
            </div>
            <div className={style.lookingForAJob}>
                <b>Looking for a job: </b> {props.lookingForAJob ? "Yes" : "No"}
            </div>
            { props.lookingForAJob &&
            <div className={style.description}>
                <b>My professional skills: </b> {props.lookingForAJobDescription}
            </div>
            }
            <div className={style.contacts}>
                <b>Contacts: </b>
            </div>
            <div className={style.editBtn}>
                <button onClick={props.activateEditProfile} className="btn btn-primary btn-sm">Edit</button>
            </div>
        </>

    );
};
export default MyProfileInfo


