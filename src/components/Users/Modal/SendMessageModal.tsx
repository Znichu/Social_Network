import React from "react";
import {Dialog, DialogTitle} from "@material-ui/core";
import {AddMessageFormType, SendMessageForm} from "../../Dialogs/SendMessageForm";
import style from './SendMessageModal.module.css'
import camera from "../../../assets/images/camera.jpeg";

type PropsType = {
    open: boolean
    handleClose: () => void
    onSubmit: (values: AddMessageFormType) => void
    avatar: string
    name: string
}

export const SendMessageModal: React.FC<PropsType> = (props) => {

    const {open, handleClose, onSubmit, avatar, name} = props;
    console.log(avatar)

    return (

        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>New message</DialogTitle>
            <div className={style.content}>
                    <div className={style.avatar}>
                        <img  src={avatar != null ? avatar : camera} alt={name}/>
                    </div>
                    <div className={style.userName}>
                        <span >{name}</span>
                    </div>
            </div>
            <div className={style.modalForm}>
                <SendMessageForm onSubmit={onSubmit}/>
            </div>
        </Dialog>
    )
}