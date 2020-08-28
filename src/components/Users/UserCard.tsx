import React from "react";
import style from "./Users.module.css";
import {NavLink} from "react-router-dom";
import smallAvatar from "../../assets/images/avatar-chase.png";
import {PhotosType} from "../../type/types";

type PropsType = {
    id: number
    name: string
    status: string
    followed: boolean
    photos: PhotosType
    followInProgress: Array<number>
    unfollow: (id: number) => void
    follow: (id: number) => void
}


export const UserCard: React.FC<PropsType> = (props) => {

    const { id, name, status, followed, photos: {small}} = props

    return (
        <div className={style.mainContainer}>
            <div className={`${style.userCard} ${style.clearfix}`}>
                <NavLink to={"/profile/" + id}>
                    <img src={small != null ? small : smallAvatar} className={style.userImg} alt='avatar'/>
                </NavLink>

                <div className={`${style.col2} ${style.clearfix}`}>
                    <div className={style.fullName}>{name}</div>
                    <div className={style.status}>{status}</div>
                    <span className={style.sendMsg}>Send message</span>
                </div>
            </div>
            {followed
                ? <button disabled={ props.followInProgress.some(userId => userId === id ) }
                          className={ style.nextUser }
                          onClick={() => { props.unfollow(id) }}>Unfollow</button>

                : <button disabled={ props.followInProgress.some(userId => userId === id ) }
                          className={ style.nextUser }
                          onClick={ () => { props.follow(id) }}>Follow</button>
            }
        </div>
    )
}
