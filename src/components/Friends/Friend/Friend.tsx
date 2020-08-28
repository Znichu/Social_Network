import React from "react";
import style from "../Friends.module.css";
import { Link } from "react-router-dom";

type Props = {
    name: string
    avatar: string
}

const FriendItem: React.FC<Props> = (props: Props) => {

    const {name, avatar} = props

    return (
            <li>
                <Link to='/'>
                    <img className={style.photoFriend}
                         src={ avatar ? avatar : `https://academvisa.ru/wp-content/uploads/2019/10/avatar-icon-images-4.png`} alt={name}/>
                    <p>{name}</p>
                </Link>
            </li>
    );

}

export default FriendItem;