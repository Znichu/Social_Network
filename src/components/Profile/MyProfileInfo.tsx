import React from "react";
import style from './MyProfileInfo.module.css'
import EditSharpIcon from '@material-ui/icons/EditSharp';


type PropsType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    activateEditProfile: () => void
}

const MyProfileInfo: React.FC<PropsType> = (props: PropsType) => {

    return (
        <div className={style.container}>
            <div className={style.profile}>
                <div className={style.aboutMe}>
                    <b>About me: </b> {props.aboutMe}
                </div>
                <div className={style.lookingForAJob}>
                    <b>Looking for a job: </b> {props.lookingForAJob ? "Yes" : "No"}
                </div>
                {props.lookingForAJob &&
                <div className={style.description}>
                    <b>My professional skills: </b> {props.lookingForAJobDescription}
                </div>
                }
                <div className={style.contacts}></div>
            </div>
            <div className={style.editBtn}>
                <EditSharpIcon  fontSize="small" onClick={props.activateEditProfile} />
            </div>
        </div>

    );
};
export default MyProfileInfo


