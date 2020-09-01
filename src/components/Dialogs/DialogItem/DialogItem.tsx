import {NavLink} from "react-router-dom";
import React from "react";
import style from "./DialogItem.module.css";
import {PhotosType} from "../../../type/types";
import avatar from "../../../assets/images/camera.jpeg"

type Props = {
    id: number
    userName: string
    photos: PhotosType
}

const DialogItem: React.FC<Props> = (props: Props) => {

    const path = "/messages/" + props.id;

    return (
        <>
            <NavLink className={style.dialogLink} to={path}>
                <li className={style.dialog}>
                    <div className={style.dialogPhoto}>
                        <div className={style.dialogImg}>
                            <img alt="" src={props.photos.small !== null ? props.photos.small : avatar}/><br/>
                        </div>
                    </div>
                    <div className={style.dialogContent}>
                        <div className={style.dialogCw}>
                            <div className={style.dialogDate}>5adu</div>
                            <div className={style.dialogName}>{props.userName}</div>
                            <div className={style.dialogPreview}>Hello</div>
                        </div>

                    </div>
                </li>
            </NavLink>
        </>
    );
}
export default DialogItem;