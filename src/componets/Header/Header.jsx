import React from "react";
import s from "./Header.module.css";

const Header = () => {
    return (
        <div className={s.header}>
            <img className={s.logo} src="https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png" alt="logo"/>
        </div>
    )
}

export default Header;