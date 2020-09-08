import React, {useEffect, useRef} from "react";
import style from "./FriendsPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {actions, requestFriends, requestSearchFriends} from "../../../redux/friend-reducer";
import {RootState} from "../../../redux/redux-store";
import {FriendItem} from "./FriendItem";
import {Loading} from "../../../common/Loading/Loading";
import {FriendSearchForm} from "../../../common/FriendSearchForm/FriendSerchForm";


const FriendsPage = React.memo(() => {

    const dispatch = useDispatch()
    const currentPage = useSelector((state: RootState) => state.friendsBlock.currentPage)

    useEffect(() => {
        dispatch(requestFriends())
    }, [currentPage])

    // implement infinite scrolling with intersection observer
    const loader = useRef(null);

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            console.log(loader.current)
            // @ts-ignore
            observer.observe(loader.current)
        }

    }, []);

    const handleObserver = (entities: Array<any>) => {
        const target = entities[0];
        if (target.isIntersecting) {
            dispatch(actions.serCurrentPage())
        }
    }

    const searchFriends = (term: string) => {
        dispatch(requestSearchFriends(term))
    }

    const friends = useSelector((state: RootState) => state.friendsBlock.friends)
    const isFetching = useSelector((state: RootState) => state.friendsBlock.isFetching)

    const friendsItem = friends.map(friend => <FriendItem key={friend.id} avatar={friend.photos.small} name={friend.name}
                                                          status={friend.status}/>)
    return (
        <div className={style.friendsBlock}>
            <div className={style.friendsHeader}>
                <FriendSearchForm searchFriends={searchFriends}/>
            </div>
            <div className={style.friendsList}>
                {friendsItem}
                <div ref={loader}></div>
                {isFetching && <Loading/>}
            </div>
        </div>
    )
})

export default FriendsPage