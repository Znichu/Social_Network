import React from "react";
import style from "./MessagesItem.module.css"

const MessageItem = (props) => {
    return (
            <section>
            <div className={style.chat}>
                <ul>
                    <li className={style.other}>
                        <a className={style.user} href="#"><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/toffeenutdesign/128.jpg" /></a>
                        <div className={style.date}>
                            2 minutes ago
                        </div>
                        <div className={style.message}>
                            <p>
                                {props.message}
                            </p>
                        </div>
                    </li>
                    <li className={style.you}>
                        <a className={style.user} href="#"><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg" /></a>
                        <div className={style.date}>
                            7 minutes ago
                        </div>
                        <div className={style.message}>
                            <p>
                                {props.message}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            </section>
    );
}


export default MessageItem;