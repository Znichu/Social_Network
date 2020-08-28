import React from "react";
import style from "../Users.module.css";
import {NavLink} from "react-router-dom";
import smallAvatar from "../../../assets/images/avatar-chase.png";
import {PhotosType} from "../../../type/types";
import {SendMessageModal} from "../Modal/SendMessageModal";
import {AddMessageFormType} from "../../Dialogs/SendMessageForm";
import {sendNewMessage} from "../../../redux/messages-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    id: number
    name: string
    status: string
    followed: boolean
    photos: PhotosType
    followInProgress: Array<number>
    unfollow: (id: number) => void
    follow: (id: number) => void
}


export const UserCard: React.FC<PropsType> = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const {id, name, status, followed, photos: {small}} = props

    const dispatch = useDispatch()

    const sendMessage = (values: AddMessageFormType) => {
        dispatch(sendNewMessage(id, values.addMessageBody));
    };

    return (
        <div className={style.mainContainer}>
            <div className={`${style.userCard} ${style.clearfix}`}>
                <NavLink to={"/profile/" + id}>
                    <img src={small != null ? small : smallAvatar} className={style.userImg} alt='avatar'/>
                </NavLink>

                <div className={`${style.col2} ${style.clearfix}`}>
                    <div className={style.fullName}>{name}</div>
                    <div className={style.status}>{status}</div>
                    <span onClick={handleClickOpen} className={style.sendMsg}>Send message</span>
                    {open && <SendMessageModal
                        name={name}
                        avatar={small}
                        open={open}
                        handleClose={handleClose}
                        onSubmit={sendMessage}
                    />}
                </div>
            </div>
            {followed
                ? <button disabled={props.followInProgress.some(userId => userId === id)}
                          className={style.nextUser}
                          onClick={() => {
                              props.unfollow(id)
                          }}>Unfollow</button>

                : <button disabled={props.followInProgress.some(userId => userId === id)}
                          className={style.nextUser}
                          onClick={() => {
                              props.follow(id)
                          }}>Follow</button>
            }
        </div>
    )
}
