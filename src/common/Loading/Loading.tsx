import React from "react";
import style from "./Loading.module.css"


export const Loading = () => {
    return (
        <div className={style.gooey}>
            <span className={style.dot}></span>
            <div className={style.dots}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}