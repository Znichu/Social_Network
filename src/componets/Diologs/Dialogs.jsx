import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {addMessageActionCreator, onMessageChangeActionCreator} from "../../redux/messages-reducer";


const Dialogs = (props) => {
    let dialogsElement =
        props.state.dialogs.map(p => <DialogItem name={p.name} id={p.id} />);

    let messagesElement =
        props.state.messages.map(m => <MessageItem message={m.message} />);

    let newMessageSend = React.createRef(); //создаем реф для отработки клика по кнопке реф прописываем в textarea

    let sendNewMessage = () => { //отправка сообщения
        props.dispatch(addMessageActionCreator());
    };

    let onMessageChange = () => {
        let text = newMessageSend.current.value;
        props.dispatch(onMessageChangeActionCreator(text));
    };


    return (
            <div className="container" style={{paddingBottom:"25px"}}>
                <div className="row">
                    <div className="col-lg-4">
                        <div className={s.dialogs}>
                            { dialogsElement }
                        </div>
                    </div>
                    <div className="col lg-8">
                        <div className={s.messages}>
                            { messagesElement }
                        </div>
                        <div className={s.enterMessage}>
                            <textarea onChange={onMessageChange} ref={newMessageSend} className={s.actionBoxInput}
                                      value={props.state.newMessageText} placeholder='Ваше сообщение...'/>
                            <button onClick={ sendNewMessage } className={s.send}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default Dialogs;