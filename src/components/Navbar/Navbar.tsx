import React from "react";
import style from "./Navbar.module.css";
import {NavLink} from "react-router-dom";


export const Navbar = () => {
    return (
        <div className={style.sidebar}>
            <div></div>
            <ul className={style.nav}>
                <li><NavLink activeClassName={style.active} to="/my-profile"><span>My Profile</span></NavLink></li>
                <li><NavLink activeClassName={style.active} to="/dialogs">Messages</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/all-friends">Friends</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/users">Find users</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/news">News</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/music">Music</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/settings">Setting</NavLink></li>
            </ul>
        </div>
    );
}