import React from "react";
import style from "./FriendItem.module.css"
import {Link} from "react-router-dom";
import camera from "../../assets/images/camera.jpeg"

type PropsType = {
    avatar: string
    name: string
    status: string | null
}

export const FriendItem: React.FC<PropsType> = React.memo((props) => {
    const {avatar, name, status} = props
    return (
        <div className={`${style.friendRow} ${style.clearFix}`}>
            <div className={style.friendPhoto}>
                <Link to={'/'}>
                    <img className={style.friendImg} src={avatar !== null ? avatar : camera} alt={name}/>
                </Link>
            </div>
            <div className={style.friendInfo}>
                <div className={`${style.friendField} ${style.friendTitle}`}>
                    <Link to={'/'}>{name}</Link>
                </div>
                <div className={style.friendField}>
                    {status}
                </div>
                <span  className={style.sendMessage}>Send message</span>
            </div>
        </div>
    )
})