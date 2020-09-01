import React, {useEffect} from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import {useDispatch, useSelector} from "react-redux";
import {requestDialogs} from "../../redux/messages-reducer";
import {RootState} from "../../redux/redux-store";


const Dialogs: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestDialogs())
    }, [])

    const dialogs = useSelector((state: RootState) => state.messagesPage.dialogs)

    const dialogsElement =
        dialogs.map(p => <DialogItem key={p.id} userName={p.userName} id={p.id} photos={p.photos}/>);


    return (
        <div className="container" style={{paddingBottom: "25px"}}>
            <div className="row">
                <div className={style.wrapper}>
                    <div className={style.dialogsHeader}></div>
                    <ul className={style.pageDialogs}>
                        {dialogsElement}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dialogs