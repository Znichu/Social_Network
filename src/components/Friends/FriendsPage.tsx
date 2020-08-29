import React, {useEffect} from "react";
import style from "./FriendsPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {requestFriends} from "../../redux/friend-reducer";
import {RootState} from "../../redux/redux-store";
import {FriendItem} from "./FriendItem";


const FriendsPage = React.memo(() => {

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(requestFriends())
    }, [])

    const friends = useSelector( (state: RootState) => state.friendsBlock.friends)
    const friendsItem = friends.map(friend => <FriendItem avatar={friend.photos.small} name={friend.name} status={friend.status}/>)
    return (
        <div className={style.friendsList}>
            {friendsItem}
        </div>
    )
})

export default FriendsPage