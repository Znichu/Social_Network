import React from "react";
import style from "./Friends.module.css"
import FriendItem from "./Friend/Friend";
import {FriendsType} from "../../type/types";

type Props = {
    friend: Array<FriendsType>
}

const Friends: React.FC<Props> = (props: Props) => {

    let friendElement =
        props.friend.map(f => <FriendItem key={f.id} name={f.name}/>);

    return (
        <div className={style.friendsBlock}>
            <div className={style.title}>
                <p>Friends</p>
            </div>
            <hr/>
            <div className="friends">
                <ul className={`${style.friendsOnline} ${style.listInline}`}>
                        {friendElement}
                </ul>
            </div>
        </div>
    );
}

export default Friends;