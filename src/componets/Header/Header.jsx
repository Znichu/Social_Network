 import React from "react";
import s from "./Header.module.css";
 import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={s.header}>
            <div>
                {props.isAuth ? <span>{props.login}</span> : <NavLink to="/auth">Login</NavLink>}
            </div>
            <img className={s.logo} src="https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png" alt="logo"/>
        </div>
    )
}

export default Header;