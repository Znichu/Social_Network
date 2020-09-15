import React from "react";
import style from "./Modal.module.css"
import {AddMessageFormType, SendMessageForm} from "../SemdMessageForm/SendMessageForm";
import {sendNewMessage} from "../../redux/messages-reducer";
import {useDispatch} from "react-redux";
import noPhoto from "../../assets/images/camera.jpeg"

type PropsType = {
    userId: number
    userName: string
    userPhoto: string
    closeModal: () => void
}

export const Modal: React.FC<PropsType> = React.memo ((props) => {

    const {userId, userName, userPhoto, closeModal} = props

    const dispatch = useDispatch()

    const sendMessage = (values: AddMessageFormType) => {
        dispatch(sendNewMessage(userId, values.addMessageBody));
        closeModal();
    };

    return (
        <div className={style.modalRoot}>
            <div className={style.modalRoot__back}></div>
            <div className={style.modalRoot__container}>
                <div className={style.modalRoot__paper}>
                <div className={style.modalRoot__header}>
                    <div className={style.header__title}>New message</div>
                    <div className={style.header__close} onClick={closeModal}>close</div>
                </div>
                <div className={style.modalRoot__info}>
                    <div className={style.info__photo}>
                        <img src={userPhoto || noPhoto} alt={userName}/>
                    </div>
                    <div className={style.info__name}>{userName}</div>
                </div>
                <div className={style.modalRoot__content}><SendMessageForm onSubmit={sendMessage}/></div>
                </div>
            </div>
        </div>
    )
})