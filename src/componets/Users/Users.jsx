import React from "react";
import style from "./Users.module.css";
import smallAvatar from "../../assets/images/avatar-chase.png";
import Pagination from "react-bootstrap/Pagination";
import {NavLink} from "react-router-dom";
import {followAPI} from "../../api/api";



let Users = (props) => {
    let user = props.users.map(u =>
        <div className={style.mainContainer}>
            <div className={`${style.userCard} ${style.clearfix}`}>
                <NavLink to={"/profile/" + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : smallAvatar} className={style.userImg}/>
                </NavLink>

                <div className={`${style.col2} ${style.clearfix}`}>
                    <div className={style.fullName}>{u.name}</div>
                    <div className={style.status}>{u.status}</div>
                    <div>City: <span>{"u.location.city"}, {"u.location.country"}</span></div>
                </div>
            </div>
            {u.followed
                ? <button disabled={props.followInProgress.some(id => id === u.id )} className={style.nextUser} onClick={() => {
                    props.followingInProgress(true, u.id);
                    followAPI.unfollow(u.id)
                        .then(data => {
                            if (  data.resultCode === 0 ) {
                                props.unfollow(u.id)
                            }
                            props.followingInProgress(false, u.id);
                        });
                }}>Unfollow</button>

                : <button disabled={props.followInProgress.some(id => id === u.id )} className={style.nextUser} onClick={ () => {
                    props.followingInProgress(true, u.id);
                    followAPI.follow(u.id)
                        .then( data => {
                            if (  data.resultCode === 0 ) {
                                props.follow(u.id)
                            }
                            props.followingInProgress(false, u.id);
                        });
                }}>Follow</button>
            }
        </div>);


    let pageCounter = Math.ceil(props.totalCount / props.totalPageCount);
    let pages = [];
    for (let i = 1; i <= pageCounter; i++) {
        pages.push(i);
    }

    // let pageElement = pages.map(p => <a className={ props.currentPage === p ? style.active : null }
    //     onClick={ () => { props.onPageClick(p) } }> { p } </a>);
    let pageElement = pages.map(p => <Pagination.Item className={ props.currentPage === p ? "active" : null }
        onClick={ () => { props.onPageClick(p) } }> { p } </Pagination.Item>);

    return (
        <div className="container">
            <div className="row">
                <div>
                    <Pagination>
                        <Pagination.First/>
                        <Pagination.Prev/>
                        {pageElement}
                        <Pagination.Ellipsis/>
                        <Pagination.Next/>
                        <Pagination.Last/>
                    </Pagination>
                </div>
                {user}
            </div>
        </div>
    );
};


export default Users;