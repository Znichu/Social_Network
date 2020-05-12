import React from "react";
import style from "./Users.module.css";
import smallAvatar from "../../assets/images/avatar-chase.png";


let Users = (props) => {
    let user = props.users.map(u =>
        <div className={style.mainContainer}>
            <div className={`${style.userCard} ${style.clearfix}`}>
                <img src={u.photos.small != null ? u.photos.small : smallAvatar} className={style.userImg}/>
                <div className={`${style.col2} ${style.clearfix}`}>
                    <div className={style.fullName}>{u.name}</div>
                    <div className={style.status}>{u.status}</div>
                    <div>City: <span>{"u.location.city"}, {"u.location.country"}</span></div>
                </div>
            </div>
            {u.followed
                ? <button className={style.nextUser} onClick={() => {
                    props.unsubscribe(u.id)
                }}>Unfollow</button>
                : <button className={style.nextUser} onClick={() => {
                    props.follow(u.id)
                }}>Follow</button>
            }
        </div>);


    let pageCounter = Math.ceil(props.totalCount / props.totalPageCount);
    let pages = [];
    for (let i = 1; i <= pageCounter; i++) {
        pages.push(i);
    }

    let pageElement = pages.map(p => <a className={ props.currentPage === p ? style.active : null }
        onClick={ () => { props.onPageClick(p) } }> { p } </a>);

    return (
        <div className="container">
            <div className="row">
                <div className={style.pagination}>{pageElement}</div>
                {user}
            </div>
        </div>
    );
};


export default Users;