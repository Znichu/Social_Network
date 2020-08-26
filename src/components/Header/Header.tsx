import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {logout} from "../../redux/auth-reducer";
import style from "./Header.module.css";
import {RootState} from "../../redux/redux-store";


export const Header: React.FC = () => {

    const {login, isAuth} = useSelector( (state: RootState) => state.auth )

    const dispatch = useDispatch()

    const logOut = () => { dispatch(logout) }

    return (
        <div className={style.header}>
            <div className={style.userName}>
                {isAuth
                    ? <span>{login}
                        <button onClick={logOut} className="btn btn-primary btn-sm">logout</button></span>
                    : <NavLink to="/login">Login</NavLink>}
            </div>
            <div className={style.logo}>
                <img src="https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png" alt="logo"/>
            </div>
        </div>
    )
};
