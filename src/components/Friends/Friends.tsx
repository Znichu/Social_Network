import React, {useEffect} from "react";
import style from "./Friends.module.css"
import FriendItem from "./Friend/Friend";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {requestFriends} from "../../redux/friend-reducer";

export const Friends: React.FC = () => {
    const dispatch = useDispatch()

    const {friends, totalCount} = useSelector((state: RootState) => state.friendsBlock)

    useEffect(() => {
        dispatch(requestFriends())
    }, [])

    let friendElement = friends.map(f => <FriendItem key={f.id} name={f.name} avatar={f.photos.small} />);

    return (
        <div className={style.friendsBlock}>
            <div className={style.blockHeader}>
                <span className={style.headerLabel}>Friends</span>
                <span className={style.friendsCount}>{totalCount}</span>
            </div>
            <div className={style.blockBody}>
                <div className={style.friendsRow}>
{/*                    <ul className={`${style.friendsOnline} ${style.listInline}`}>

                    </ul>*/}
                    {friendElement}
                </div>

            </div>
        </div>
    );
}
