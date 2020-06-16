import React from "react";
import style from "./Friends.module.css"
import FriendItem from "./Friend/Friend";


const Friends = (props) => {

    let friendElement =
        props.friend.map(f => <FriendItem name={f.name}/>);

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