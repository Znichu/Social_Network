import React from "react";
import style from "./CustomButton.module.css"

type PropsType = {
    title: string
    onClick?: () => void
}

export const CustomButton: React.FC<PropsType> = (props) => {

    const {title, onClick} = props

    const propsFunction = () => {
        if (onClick) {
            onClick()
        }
    }

    return(
        <button onClick={propsFunction} className={style.customButton}>{title}</button>
    )
}


