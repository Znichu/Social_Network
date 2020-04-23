import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";



const Dialogs = (props) => {

    let dialogsElement =
        props.dialogs.map(p => <DialogItem name={p.name} id={p.id} />);

    let messagesElement =
        props.messages.map(m => <MessageItem message={m.message} />);

    let newMessageSend = React.createRef(); //создаем реф для отработки клика по кнопке реф прописываем в textarea

    let sendNewMessage = () => { //отправка сообщения
       props.sendNewMessage();
    };

    let onMessageChange = ( ) => {
        let text = newMessageSend.current.value;
        props.onMessageChange(text);
    };


    return (
            <div className="container" style={{paddingBottom:"25px"}}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className={s.dialogs}>
                            { dialogsElement }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col lg-12">
                        <div className={s.messages}>
                            { messagesElement }
                        </div>
                        <div className={s.enterMessage}>
                            <textarea onChange={onMessageChange} ref={newMessageSend} className={s.actionBoxInput}
                                      value={props.newMessageText} placeholder='Ваше сообщение...'/>
                            <button onClick={ sendNewMessage } className={s.send}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default Dialogs;