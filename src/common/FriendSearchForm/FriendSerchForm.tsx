import React, {ChangeEvent} from "react";
import {useFormik} from "formik";
import style from "./FriendSerchForm.module.css"

type MyFormsValue = {
    term: string
}

type PropsType = {
    searchFriends: (term: string) => void
}

export const FriendSearchForm: React.FC<PropsType> = (props) => {

    const formik = useFormik<MyFormsValue>({
        initialValues: {
            term: ''
        },

        onSubmit: (values) => {
            props.searchFriends(values.term)
            console.log(values.term)
        },

    });

    const onKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            formik.handleSubmit()
        }
    }

    return (
        <div className={style.friendForm}>
            <form onSubmit={formik.handleSubmit}>
                <input
                    className={style.friendForm__input}
                    placeholder='Search friends'
                    name="term"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.term}
                    onKeyPress={() => onKeyPress}
                />
                {/*<button type="submit">Submit</button>*/}
            </form>
        </div>
    )
}