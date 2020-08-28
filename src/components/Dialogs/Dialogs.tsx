import React, {useEffect} from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import {useDispatch, useSelector} from "react-redux";
import {requestDialogs} from "../../redux/messages-reducer";
import {RootState} from "../../redux/redux-store";


const Dialogs: React.FC = () => {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(requestDialogs())
    }, [])

    const dialogs = useSelector( (state: RootState) => state.messagesPage.dialogs )

    const dialogsElement =
        dialogs.map(p => <DialogItem key={p.id} userName={p.userName} id={p.id} photos={p.photos} />);



    return (
        <div className="container" style={{paddingBottom: "25px"}}>
            <div className="row">
                <div className="col-lg-12">
                    <div className={style.dialogs}>
                        {dialogsElement}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs