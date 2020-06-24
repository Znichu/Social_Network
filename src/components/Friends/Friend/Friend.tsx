import React from "react";
import style from "../Friends.module.css";

type Props = {
    name: string
}

const FriendItem: React.FC<Props> = (props: Props) => {
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