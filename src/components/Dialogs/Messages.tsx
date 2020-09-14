import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMessagesFriend, sendNewMessage} from "../../redux/messages-reducer";
import {useParams} from "react-router";
import MessageItem from "./MessageItem/MessageItem";
import {RootState} from "../../redux/redux-store";
import style from "./Messages.module.css";
import {AddMessageFormType, SendMessageForm} from "../../common/SemdMessageForm/SendMessageForm";
import moment from "moment";
import noPhoto from "../../assets/images/camera.jpeg";
import {Loading} from "../../common/Loading/Loading";


const Messages = React.memo(() => {
    const {userId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessagesFriend(userId))
    }, [userId]);

    const messages = useSelector((state: RootState) => state.messagesPage.messages);
    const isFetching = useSelector((state: RootState) => state.messagesPage.isFetching)
    const myId = useSelector((state: RootState) => state.auth.userId)
    const dialogs = useSelector((state: RootState) => state.messagesPage.dialogs)

    const messagesElement =
        messages.map(m => <MessageItem key={m.id} myId={myId} addedAt={m.addedAt} senderName={m.senderName} senderId={m.senderId} message={m.body}/>);

    const chat = dialogs.filter(el => el.id == userId)

    const sendMessage = (values: AddMessageFormType) => {
        dispatch(sendNewMessage(userId, values.addMessageBody));
    };

    return (
        <div className={style.messageContainer}>
            {isFetching && <Loading/>}
            <div className={style.chatHeader}>
                <div className={style.chatHeader__photo}>
                    <img src={chat[0].photos.small || noPhoto} alt=""/>
                </div>
                <div className={style.chatAbout}>
                    <div className={style.chatWith}>Chat with {chat[0].userName}</div>
                    <div className={style.chatAbout__date}>last seen {moment(chat[0].lastUserActivityDate).calendar()}</div>
                </div>
            </div>
            <div className={style.chatHistory}>
                <ul style={{listStyle: "none", padding: 0}}>
                    {messagesElement}
                </ul>
            </div>
            <div className={style.sendMessage}>
                <SendMessageForm onSubmit={sendMessage}/>
            </div>
        </div>
    )
})

export default Messages
