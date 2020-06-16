import React, {useEffect, useState} from "react";
import style from './MyProfile.module.css'
import MyProfileInfo from "./MyProfileInfo";
import FormEditProfileReduxForm from "../../common/FormEditProfileData/FormEditProfile";


const MyProfile = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    const [editProfile, setEditProfile] = useState(false);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditProfile = () => {
        setEditProfile(true);
    };
    const deactivateEditProfile = () => {
        setEditProfile(false);
    };
    const activateEditMode = () => {
        setEditMode(true)
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateMyStatus(status);
    };

    const onChangeInput = (e) => {
        setStatus(e.currentTarget.value)
    };

    const onSubmit = (values) => {
        props.saveProfile(values);
        deactivateEditMode(false);
    };

    if (!props.profile) {
        return <> </>
    }
    return (
        <div className={style.myProfileCard}>
            <div className={style.myProfilePhoto}>
                <img src={props.profile.photos.large} alt="avatar"/>
            </div>
            <div className={style.myProfileInfo}>
                <div className={style.fullName}>
                    <h4>{props.profile.fullName}</h4>
                </div>
                <div className={style.status}>
                    {!editMode &&
                    <div>
                        <span onClick={activateEditMode}>{status}</span>
                    </div>

                    }
                    {editMode &&
                    <input onChange={onChangeInput} autoFocus={true} onBlur={deactivateEditMode}
                           value={status} type="text"/>
                    }
                </div>
                <hr/>
                { !editProfile
                    ? <MyProfileInfo
                        activateEditProfile={activateEditProfile}
                        lookingForAJob={props.profile.lookingForAJob}
                        lookingForAJobDescription={props.profile.lookingForAJobDescription}
                        aboutMe={props.profile.aboutMe}
                    />
                    : <FormEditProfileReduxForm onSubmit={onSubmit} />
                }
            </div>
        </div>
    );
};
export default MyProfile


