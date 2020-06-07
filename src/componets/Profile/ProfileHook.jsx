import s from "./Profile.module.css";
import React, {useState} from "react";

const ProfileHook = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

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

    return (
        <div className={s.profile_card}>
            <img className={s.profile_photo}
                 src="https://avatars2.githubusercontent.com/u/23550189?s=400&v=4"
                 alt=""/>
            <h5>Sergey Neplashov</h5>
            <div className={s.status}>
                { !editMode &&
                <span className={s.statusTitle} onDoubleClick={ activateEditMode }>{ status }</span>
                }
                { editMode &&
                <input onChange={ onChangeInput } autoFocus={true} onBlur={ deactivateEditMode }
                       value={ status } type="text"/>
                }

            </div>
            {/*<div>*/}
            {/*    <ul className={s.my_profile}>*/}
            {/*        <li>Date of Birth: 05.08.1991</li>*/}
            {/*        <li>City: Slavgorod</li>*/}
            {/*        <li>Education: GGU Skoriny</li>*/}
            {/*    </ul>*/}
            {/*</div>*/}

        </div>
    );
};

export default ProfileHook;