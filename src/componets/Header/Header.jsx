 import React from "react";
import s from "./Header.module.css";
 import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={s.header}>
            <div className={s.userName}>
                {props.isAuth
                    ? <span>{props.login} <button onClick={props.logout} className="btn btn-primary btn-sm">logout</button></span>
                    : <NavLink to="/login">Login</NavLink>}
            </div>
            <div className={s.logo}>
                <img src="https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png" alt="logo"/>
            </div>
        </div>
    )
};

export default Header;