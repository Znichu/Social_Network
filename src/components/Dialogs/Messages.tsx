import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMessagesFriend, sendNewMessage} from "../../redux/messages-reducer";
import {useParams} from "react-router";
import MessageItem from "./MessageItem/MessageItem";
import {RootState} from "../../redux/redux-store";
import style from "./Messages.module.css";
import {AddMessageFormType, SendMessageForm} from "../../common/SemdMessageForm/SendMessageForm";


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
        messages.map(m => <MessageItem key={m.id} myId={myId} senderName={m.senderName} senderId={m.senderId} message={m.body}/>);
    

    const sendMessage = (values: AddMessageFormType) => {
        dispatch(sendNewMessage(userId, values.addMessageBody));
    };

    return (
        <div className={style.messageContainer}>
            <div className={style.chatHeader}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt=""/>
                <div className={style.chatAbout}>
                    <div className={style.chatWith}>Chat with Vincent Porter</div>
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
