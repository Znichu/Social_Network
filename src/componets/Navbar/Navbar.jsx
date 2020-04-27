import React from "react";
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";


const Navbar = () => {
    return (
        <div className={s.card}>
            <ul className={s.main_nav}>
                <li><NavLink activeClassName={s.active} to="/myposts">My Posts</NavLink></li>
                <li><NavLink activeClassName={s.active} to="/dialogs">Message</NavLink></li>
                <li><NavLink activeClassName={s.active} to="/users">Find Users</NavLink></li>
                <li><NavLink activeClassName={s.active} to="/news">News</NavLink></li>
                <li><NavLink activeClassName={s.active} to="/music">Music</NavLink></li>
                <li><NavLink activeClassName={s.active} to="/setting">Setting</NavLink></li>
            </ul>
        </div>
    );
}
export default Navbar;