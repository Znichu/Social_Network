import React from "react";
import style from "../Friends.module.css";

const FriendItem = (props) => {
    return (
            <li>
                <a href="#">
                    <img className={style.photoFriend}
                         src="https://academvisa.ru/wp-content/uploads/2019/10/avatar-icon-images-4.png" alt=""/>
                    <p>{props.name}</p>
                </a>
            </li>
    );

}

export default FriendItem;