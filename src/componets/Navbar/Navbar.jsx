import React from "react";
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";


const Navbar = () => {
    return (
        <div className={s.card}>
            <ul className={s.main_nav}>
                <li><NavLink className={s.active} to="/myposts">My Posts</NavLink></li>
                <li><NavLink to="/dialogs">Message</NavLink></li>
                <li><NavLink to="/news">News</NavLink></li>
                <li><NavLink to="/music">Music</NavLink></li>
                <li><NavLink to="/setting">Setting</NavLink></li>
            </ul>
        </div>
    );
}
export default Navbar;