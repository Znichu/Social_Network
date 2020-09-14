import React from "react";
import style from "./MessagesItem.module.css"
import {Link} from "react-router-dom";

type Props = {
    senderId: number
    message: string
    senderName: string
    myId: number | null
}

const MessageItem: React.FC<Props> = (props) => {
    const {senderId, message, senderName, myId} = props

    const messageData = senderId === myId ? `${style.messageData} ${style.alignRight}` : style.messageData
    const chatMessage = senderId === myId ? `${style.message} ${style.myMessage} ${style.floatRight}` : `${style.message} ${style.otherMessage}`

    return (
        <li className={style.clearfix}>
            <div className={messageData}>
                <span className={style.messageData__time}>10:10 AM, Today</span> &nbsp; &nbsp;
                <span className={style.messageData__name}>{senderName}</span>
            </div>
            <div className={chatMessage}>
                {message}
            </div>
        </li>
    );
}


export default MessageItem;