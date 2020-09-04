import React from "react";
import style from "./UserCard.module.css";
import {NavLink} from "react-router-dom";
import noPhoto from "../../../assets/images/camera.svg";
import {PhotosType} from "../../../type/types";
import {CustomButton} from "../../../common/CustomButton/CustomButton";

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

    const {id, name, status, followed, photos: {small}} = props

    return (
        <>
            <div className={style.userCard}>
                <div className={style.userCardPhoto}>
                    <NavLink to={"/profile/" + id}>
                        <img src={small || noPhoto} className={style.userImg} alt='avatar'/>
                    </NavLink>
                </div>

                <div className={style.fullName}>
                    <NavLink to={"/profile/" + id}>
                        {name}
                    </NavLink>
                </div>
                <div className={style.userCardBtn}>
                {followed
                    ? <CustomButton
                        title={'Unfollow'}
                        disabled={props.followInProgress.some(userId => userId === id)}
                        onClick={() => {props.unfollow(id)}}
                    />

                    : <CustomButton
                        title={'Follow'}
                        disabled={props.followInProgress.some(userId => userId === id)}
                        onClick={() => {props.follow(id)}}
                    />
                }
                </div>
            </div>

        </>
    )
}
