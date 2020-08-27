import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMessagesFriend, sendNewMessage} from "../../redux/messages-reducer";
import {useParams} from "react-router";
import MessageItem from "./MessageItem/MessageItem";
import {RootState} from "../../redux/redux-store";
import style from "./Messages.module.css";
import {AddMessageFormType, SendMessageForm} from "./SendMessageForm";


const Messages = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessagesFriend(id))
    }, [id]);

    const messages = useSelector((state: RootState) => state.messagesPage.messages);

    const messagesElement =
        messages.map(m => <MessageItem key={m.id} message={m.body}/>);

    const sendMessage = (values: AddMessageFormType) => {
        dispatch(sendNewMessage(id, values.addMessageBody));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {messagesElement}
                </div>
            </div>
            <div className="row">
                <div className="col lg-12">
                    <div className={style.enterMessage}>
                        <SendMessageForm onSubmit={sendMessage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages
