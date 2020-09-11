import React, {ChangeEvent, useEffect, useState} from "react";
import style from './MyProfile.module.css'
import MyProfileInfo from "./MyProfileInfo";
import FormEditProfileReduxForm from "../../common/FormEditProfileData/FormEditProfile";
import {ProfileType} from "../../type/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {savePhoto, saveProfile, updateMyStatus} from "../../redux/myProfile-reducer";
import {UploadFile} from "../../common/UploadFile/UploadFile";
import camera from "../../assets/images/camera.jpeg";


const MyProfile: React.FC = () => {

    const profile = useSelector((state: RootState) => state.myProfile.profile)
    const status = useSelector((state: RootState) => state.myProfile.status )

    useEffect(() => {
        setStatus(status)
    }, [status]);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [mainStatus, setStatus] = useState<string>(status);
    const [editProfile, setEditProfile] = useState<boolean>(false);

    const dispatch = useDispatch()

    const activateEditProfile = () => {
        setEditProfile(true);
    };
    const deactivateEditProfile = () => {
        setEditProfile(false);
    };
    const activateEditModeStatus = () => {
        setEditMode(true)
    };
    const deactivateEditModeStatus = () => {
        setEditMode(false);
        dispatch(updateMyStatus(mainStatus));
    };

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value)
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        const file =  event.currentTarget.files
        // @ts-ignore
        dispatch(savePhoto(file[0]))
    };

    const onSubmit = (values: ProfileType) => {
        dispatch(saveProfile(values));
        deactivateEditProfile();
    };

    if (!profile) {
        return <> </>
    }

    return (
        <div className={style.myProfileCard}>
            <div className={style.myProfilePhoto}>
                <img src={profile.photos.large || camera} alt=""/>
                <div className={style.overlay}></div>
                <div className={style.uploadButton}><UploadFile onFileChange={onFileChange}/></div>
            </div>
            <div className={style.myProfileInfo}>
                <div className={style.fullName}>
                    <h4>{profile.fullName}</h4>
                </div>
                <div className={style.status}>
                    {!editMode &&
                    <div>
                        <span onClick={activateEditModeStatus}>{mainStatus}</span>
                    </div>

                    }
                    {editMode &&
                    <input onChange={onChangeInput} autoFocus={true} onBlur={deactivateEditModeStatus}
                           value={mainStatus} type="text"/>
                    }
                </div>
                <hr/>
                {!editProfile
                    ? <MyProfileInfo
                        activateEditProfile={activateEditProfile}
                        lookingForAJob={profile.lookingForAJob}
                        lookingForAJobDescription={profile.lookingForAJobDescription}
                        aboutMe={profile.aboutMe}
                    />
                    : <FormEditProfileReduxForm initialValues={profile} onSubmit={onSubmit}/>
                }
            </div>
        </div>
    );
};
export default MyProfile


