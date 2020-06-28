import React, {ChangeEvent, useEffect, useState} from "react";
import style from './MyProfile.module.css'
import MyProfileInfo from "./MyProfileInfo";
import FormEditProfileReduxForm from "../../common/FormEditProfileData/FormEditProfile";
import {ProfileType} from "../../type/types";


type PropsType = {
    status: string
    profile: null | ProfileType
    updateMyStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => void
}

const MyProfile: React.FC<PropsType> = (props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);
    const [editProfile, setEditProfile] = useState<boolean>(false);

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

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value)
    };

    const onSubmit = (values: any) => {
        props.saveProfile(values);
        deactivateEditProfile();
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
                    : <FormEditProfileReduxForm initialValues={props.profile} onSubmit={onSubmit} />
                }
            </div>
        </div>
    );
};
export default MyProfile


