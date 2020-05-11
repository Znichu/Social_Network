import React from "react";
import style from './Users.module.css'
import * as axios from "axios";
import smallAvatar from './../../assets/images/avatar-chase.png'

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.totalPageCount}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount)
            });
    }

    onPageClick = (p) => {
        this.props.setCurrentPage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.totalPageCount}`)
            .then(response => {const users = response.data.items; this.props.setUsers(users)});
    };

    render() {
        let user = this.props.users.map( u =>
            <div className={style.mainContainer}>
                <div className={`${style.userCard} ${style.clearfix}`}>
                    <img src={u.photos.small != null ? u.photos.small : smallAvatar } className={style.userImg}/>
                    <div className={`${style.col2} ${style.clearfix}`}>
                        <div className={style.fullName}>{u.name}</div>
                        <div className={style.status}>{u.status}</div>
                        <div>City: <span>{"u.location.city"}, {"u.location.country"}</span></div>
                    </div>
                </div>
                {u.followed
                    ? <button className={style.nextUser} onClick={() => {this.props.unsubscribe(u.id)}}>Unfollow</button>
                    : <button className={style.nextUser} onClick={() => {this.props.follow(u.id)}}>Follow</button>
                }
            </div>);


        let pageCounter = Math.ceil(this.props.totalCount / this.props.totalPageCount);
        let pages = [];
        for (let i = 1; i <= pageCounter; i++) {
            pages.push(i);
        }

        let pageElement = pages.map(p => <a
                                            className={this.props.currentPage === p ? style.active : null}
                                            onClick={() => { this.onPageClick(p) }}>
                                            {p}
                                        </a>);

        return (
            <div className="container">
                <div className="row">
                    <div className={style.pagination}>{pageElement}</div>
                    {user}
                </div>
            </div>
        );
    }
}


export default Users;