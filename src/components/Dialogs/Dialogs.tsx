import React, {useEffect} from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import {useDispatch, useSelector} from "react-redux";
import {requestDialogs} from "../../redux/messages-reducer";
import {RootState} from "../../redux/redux-store";
import {Loading} from "../../common/Loading/Loading";
import noPhoto from "../../assets/images/camera.jpeg";


const Dialogs: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestDialogs())
    }, [])

    const dialogs = useSelector((state: RootState) => state.messagesPage.dialogs)
    const avatar = useSelector((state: RootState) => state.myProfile.profile?.photos.small)
    const isFetching = useSelector((state: RootState) => state.messagesPage.isFetching)

    const dialogsElement =
        dialogs.map(p => <DialogItem key={p.id} userName={p.userName} id={p.id} photos={p.photos}/>);


    return (
        <div className={style.dialogsBlock}>
            <div className={style.dialogsHeader}>
                <div className={style.dialogs_avatar}>
                    <img className={style.dialogs_avatar__img} src={avatar || noPhoto} alt=""/>
                </div>
                <h4 className={style.dialogsHeader__title}>Chats</h4>
            </div>
            {isFetching && <Loading/>}
            <div className={style.dialogsLiner}></div>
            <ul className={style.pageDialogs}>
                {dialogsElement}
            </ul>
        </div>
    );
};

export default Dialogs