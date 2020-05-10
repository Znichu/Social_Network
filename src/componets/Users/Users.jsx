import React from "react";
import style from './Users.module.css'
import * as axios from "axios";
import smallAvatar from './../../assets/images/avatar-chase.png'

class Users extends React.Component {
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {const users = response.data.items; this.props.setUsers(users)});
    }

    render() {
        let user = this.props.users.map( u =>
            <div className={style.mainContainer}>
                <div className={`${style.userCard} ${style.clearfix}`}>
                    <img src={u.photos.small != null ? u.photos.small : smallAvatar } className={style.userImg}/>
                    <div className={`${style.col2} ${style.clearfix}`}>
                        <div className={style.fullname}>{u.name}</div>
                        <div className={style.status}>{u.status}</div>
                        <div>City: <span>{"u.location.city"}, {"u.location.country"}</span></div>
                    </div>
                </div>
                {u.followed
                    ? <button className={style.nextUser} onClick={() => {this.props.unsubscribe(u.id)}}>Unfollow</button>
                    : <button className={style.nextUser} onClick={() => {this.props.follow(u.id)}}>Follow</button>
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
}


export default Users;