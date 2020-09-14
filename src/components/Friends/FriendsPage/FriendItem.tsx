import React, {useState} from "react";
import style from "./FriendItem.module.css"
import {Link} from "react-router-dom";
import noPhoto from "../../../assets/images/camera.jpeg";
import {Modal} from "../../../common/CustomModal/Modal";

type PropsType = {
    avatar: string
    name: string
    status: string | null
    userId: number
}

export const FriendItem: React.FC<PropsType> = React.memo((props) => {
    const [visible, setOpenModal] = useState(false)
    const {avatar, name, status, userId} = props

    const openModal = () => {
        setOpenModal(true)
    }

    const closeModal  = () => {
        setOpenModal(false)
    }

    return (
        <div className={`${style.friendRow} ${style.clearFix}`}>
            <div className={style.friendPhoto}>
                <Link to={'/'}>
                    <img className={style.friendImg} src={avatar || noPhoto} alt={name}/>
                </Link>
            </div>
            <div className={style.friendInfo}>
                <div className={`${style.friendField} ${style.friendTitle}`}>
                    <Link to={'/'}>{name}</Link>
                </div>
                <div className={style.friendField}>
                    {status}
                </div>
                <span onClick={openModal}  className={style.sendMessage}>Write message</span>
                {visible && <Modal closeModal={closeModal} userId={userId} userName={name} userPhoto={avatar}/>}
            </div>
        </div>
    )
})