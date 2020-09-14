import React from "react";
import style from "./MessagesItem.module.css"
import moment from "moment";

type Props = {
    senderId: number
    message: string
    senderName: string
    myId: number | null
    addedAt: string
}

const MessageItem: React.FC<Props> = (props) => {
    const {senderId, message, senderName, myId, addedAt} = props

    const messageData = senderId === myId ? `${style.messageData} ${style.alignRight}` : style.messageData
    const chatMessage = senderId === myId ? `${style.message} ${style.myMessage} ${style.floatRight}` : `${style.message} ${style.otherMessage}`

    return (
        <li className={style.clearfix}>
            <div className={messageData}>
                <span className={style.messageData__time}>{moment(addedAt).format('LT')}</span> &nbsp; &nbsp;
                <span className={style.messageData__name}>{senderName}</span>
            </div>
            <div className={chatMessage}>
                {message}
            </div>
        </li>
    );
}


export default MessageItem;