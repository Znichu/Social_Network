import React from "react";
import style from "./Friends.module.css"
import FriendItem from "./Friend/Friend";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";

export const Friends: React.FC = () => {

    const friend = useSelector( (state: RootState) => state.friendsBlock.friend )

    let friendElement = friend.map(f => <FriendItem key={f.id} name={f.name}/>);

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
