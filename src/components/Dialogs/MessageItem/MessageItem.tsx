import React from "react";
import style from "./MessagesItem.module.css"
import {Link} from "react-router-dom";

type Props = {
    message: string
}

const MessageItem: React.FC<Props> = (props: Props) => {
    return (
            <section>
            <div className={style.chat}>
                <ul>
                    <li className={style.other}>
                        <Link className={style.user} to={'/'}><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/toffeenutdesign/128.jpg" /></Link>
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
                        <Link className={style.user} to='/'><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg" /></Link>
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