import React, {useEffect, useRef} from "react";
import style from "./FriendsPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {actions, requestFriends} from "../../../redux/friend-reducer";
import {RootState} from "../../../redux/redux-store";
import {FriendItem} from "./FriendItem";
import {Loading} from "../../../common/Loading/Loading";
import noPhoto from "../../../assets/images/camera.jpeg";


const FriendsPage = React.memo(() => {

    const dispatch = useDispatch()
    const currentPage = useSelector((state: RootState) => state.friendsBlock.currentPage)
    const userAvatar = useSelector((state: RootState) => state.myProfile.profile?.photos.small)

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

    const friends = useSelector((state: RootState) => state.friendsBlock.friends)
    const isFetching = useSelector((state: RootState) => state.friendsBlock.isFetching)

    const friendsItem = friends.map(friend => <FriendItem key={friend.id} avatar={friend.photos.small} name={friend.name}
                                                          status={friend.status} userId={friend.id}/>)
    return (
        <div className={style.friendsBlock}>
            <div className={style.friendsHeader}>
                <div className={style.friendsAvatar}>
                    <img className={style.friendsAvatar__img} src={userAvatar || noPhoto} alt=""/>
                </div>
                <h4 className={style.friendsHeader__title}>Friends</h4>
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