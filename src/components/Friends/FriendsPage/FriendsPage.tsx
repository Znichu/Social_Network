import React, {useEffect, useCallback, useRef} from "react";
import style from "./FriendsPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {actions, requestFriends} from "../../../redux/friend-reducer";
import {RootState} from "../../../redux/redux-store";
import {FriendItem} from "./FriendItem";
import {LinearProgress} from "@material-ui/core";


const FriendsPage = React.memo(() => {

    const dispatch = useDispatch()
    const currentPage = useSelector((state: RootState) => state.friendsBlock.currentPage)

    useEffect(() => {
        dispatch(requestFriends())
    }, [currentPage])

    // implement infinite scrolling with intersection observer
    let bottomBoundaryRef = useRef(null);

    const scrollObserver = useCallback(
        node => {
            new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.intersectionRatio > 0) {
                        dispatch(actions.serCurrentPage());
                    }
                });
            }).observe(node);
        },
        [dispatch]
    );

    useEffect(() => {
        if (bottomBoundaryRef.current) {
            scrollObserver(bottomBoundaryRef.current);
        }
    }, [scrollObserver, bottomBoundaryRef]);

    const friends = useSelector((state: RootState) => state.friendsBlock.friends)
    const isFetching = useSelector((state: RootState) => state.friendsBlock.isFetching)

    const friendsItem = friends.map(friend => <FriendItem avatar={friend.photos.small} name={friend.name}
                                                          status={friend.status}/>)
    return (
        <>
            {isFetching && <LinearProgress/>}
            <div className={style.friendsList}>
                {friendsItem}
                <div className={style.scroll} ref={bottomBoundaryRef}></div>
            </div>
        </>
    )
})

export default FriendsPage