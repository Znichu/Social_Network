import React from "react";
import style from './Users.module.css'


const Users = (props) => {

    let user = props.users.map( u =>
        <div className={style.mainContainer}>
            <div className={`${style.userCard} ${style.clearfix}`}>
                <img src={u.urlAvatar} className={style.userImg}/>
                    <div className={`${style.col2} ${style.clearfix}`}>
                        <div className={style.fullname}>{u.fullName}</div>
                        <div className={style.status}>{u.status}</div>
                        <div>City: <span>{u.location.city}, {u.location.country}</span></div>
                    </div>
            </div>
            {u.followed
            ? <button className={style.nextUser} onClick={() => {props.unsubscribe(u.id)}}>Unfollow</button>
            : <button className={style.nextUser} onClick={() => {props.follow(u.id)}}>Follow</button>
            }
        </div>);

    return (
        <div className="container">
            <div className="row">
                {user}
            </div>
        </div>

    );
}

export default Users;