import React from "react";
import style from "./CustomButton.module.css"

type PropsType = {
    title: string
    onClick?: () => void
    disabled?: boolean
}

export const CustomButton: React.FC<PropsType> = (props) => {

    const {title, onClick, disabled} = props

    const propsFunction = () => {
        if (onClick) {
            onClick()
        }
    }

    return(
        <button
            onClick={propsFunction}
            className={style.customButton}
            disabled={disabled}
        >
            {title}
        </button>
    )
}


