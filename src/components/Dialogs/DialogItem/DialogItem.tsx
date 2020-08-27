import {NavLink} from "react-router-dom";
import React from "react";
import style from "./DialogItem.module.css";
import {PhotosType} from "../../../type/types";

type Props = {
    id: number
    userName: string
    photos: PhotosType
}

const DialogItem: React.FC<Props> = (props: Props) => {

    const path = "/messages/" + props.id;

    return (
            <ul className={style.friendDialog}>
                <NavLink to={path}>
                <li className={style.other}><img alt="" src={props.photos.small !== null ? props.photos.small : `https://academvisa.ru/wp-content/uploads/2019/10/avatar-icon-images-4.png`}/><br/>
                    {props.userName}
                </li>
                </NavLink>
            </ul>
    );
}
export default DialogItem;