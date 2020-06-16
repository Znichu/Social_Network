import s from "./Profile.module.css";
import React, {useEffect, useState} from "react";
import SavePhoto from "../../common/MadalSavePhoto/SavePhoto";


const ProfileHook = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

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

    if (!props.profile) {
        return <> </>
    }
    return (
        <div className={s.profile_card}>
            <div className={s.profile_photo}>
                <img src={props.profile.photos.large} alt="avatar"/>
            </div>
            <div className={s.savePhoto}>
                <SavePhoto savePhoto={props.savePhoto}/>
            </div>
            <div>
                <h5>{props.profile.fullName}</h5>
            </div>
            <div className={s.status}>
                {!editMode &&
                <span className={s.statusTitle} onDoubleClick={activateEditMode}>{status}</span>
                }
                {editMode &&
                <input onChange={onChangeInput} autoFocus={true} onBlur={deactivateEditMode}
                       value={status} type="text"/>
                }
            </div>
        </div>
    );
};

export default ProfileHook;