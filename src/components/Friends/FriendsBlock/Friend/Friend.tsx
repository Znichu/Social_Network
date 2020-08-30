import React from "react";
import style from "./Friend.module.css";
import { Link } from "react-router-dom";
import camera from "../../../../assets/images/camera.jpeg"

type Props = {
    name: string
    avatar: string
}

const FriendItem: React.FC<Props> = (props: Props) => {

    const {name, avatar} = props

    return (
            <div className={style.friendCell}>
                <Link className={style.friendCellAva} to='/'>
                    <img className={style.friendCellImg} src={ avatar || camera} alt={name}/>
                </Link>
                <div className={style.friendCellName}>
                    <Link to={'/'}>{name}</Link>
                </div>
            </div>
    );

}

export default FriendItem;