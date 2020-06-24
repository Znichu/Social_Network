import {NavLink} from "react-router-dom";
import React from "react";
import style from "./DialogItem.module.css";

type Props = {
    id: number
    name: string
}

const DialogItem: React.FC<Props> = (props: Props) => {

    let path = "/dialogs/" + props.id;

    return (
            <ul className={style.friendDialog}>
                <li className={style.other}><img alt="" src="https://academvisa.ru/wp-content/uploads/2019/10/avatar-icon-images-4.png"/><br/>
                    <NavLink to={path}>{props.name}</NavLink>
                </li>
            </ul>
    );
}
export default DialogItem;