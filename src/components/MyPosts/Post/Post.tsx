import React from "react";
import s from "./Post.module.css"
import {ProfileType} from "../../../type/types";
import noPhoto from "../../../assets/images/camera.jpeg";

type PropsType = {
    likes: number
    message: string
    avatar: ProfileType | null
}

const Post: React.FC<PropsType> = (props:PropsType) => {

    const avatar = props.avatar?.photos.small;

    return (
        <div className={s.post_content}>
            <div className={s.post_container}>
                <img className={`${s.profile_photo_md} ${s.pull_left}`}
                     src={avatar} alt="avatarUser"/>
                <div className={s.post_detail}>
                    <div className={s.userInfo}>
                        <h5>{props.avatar?.fullName || noPhoto}</h5>
                        <p className={s.text_muted}>Published about 3 mins ago</p>
                    </div>
                </div>
                <div className={s.post_text}>
                    <p> {props.message} </p>
                </div>
                <div>
                    <span className={s.main_like}>You and {props.likes} people like this</span>
                </div>
            </div>
        </div>
    );
}

export default Post