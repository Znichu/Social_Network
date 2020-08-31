import React from "react";
import style from "./Navbar.module.css";
import {NavLink} from "react-router-dom";


export const Navbar = () => {
    return (
        <div className={style.card}>
            <ul className={style.main_nav}>
                <li><NavLink activeClassName={style.active} to="/myprofile">My profile</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/dialogs">Message</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/allfriends">Friends</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/users">Find users</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/news">News</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/music">Music</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/setting">Setting</NavLink></li>
            </ul>
        </div>
    );
}