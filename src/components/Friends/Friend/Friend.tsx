import React from "react";
import style from "../Friends.module.css";
import { Link } from "react-router-dom";

type Props = {
    name: string
}

const FriendItem: React.FC<Props> = (props: Props) => {
    return (
            <li>
                <Link to='/'>
                    <img className={style.photoFriend}
                         src="https://academvisa.ru/wp-content/uploads/2019/10/avatar-icon-images-4.png" alt=""/>
                    <p>{props.name}</p>
                </Link>
            </li>
    );

}

export default FriendItem;