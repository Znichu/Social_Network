import React from 'react'
import {useFormik} from "formik";
import {Button, Input, MenuItem, Select, withStyles} from "@material-ui/core";
import style from "./UsersSearchForm.module.css"
import {CustomButton} from "../CustomButton/CustomButton";

const ColorButton = withStyles(() => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#0063cc',
        '&:hover': {
            backgroundColor: '#ffffff',
        },
    },
}))(Button);


export const UsersSearchForm: React.FC<PropsType> = (props) => {
    const usersSearchForm = useFormik({
        initialValues: {
            term: '',
            friend: 'null'
        },
        onSubmit: (values) => {
            const filter = {
                term: values.term,
                friend: values.friend === "null" ? null: values.friend === "true" ? true : false
            }
            props.searchUsers(filter.term, filter.friend );
            console.table(filter)
        },
    });

    return (
        <>
            <form onSubmit={usersSearchForm.handleSubmit}>
                <div className={style.formContainer}>
                    <Input placeholder="Enter name"
                           inputProps={{'aria-label': 'description'}}
                           name="term"
                           onChange={usersSearchForm.handleChange}
                           value={usersSearchForm.values.term}
                    />
                    <Select
                        name='friend'
                        value={usersSearchForm.values.friend}
                        onChange={usersSearchForm.handleChange}
                    >
                        <MenuItem value={'null'}>all</MenuItem>
                        <MenuItem value={'true'}>only followed</MenuItem>
                        <MenuItem value={'false'}>only unfollowed</MenuItem>
                    </Select>
<CustomButton title={'Search'}/>
                </div>
            </form>
        </>
    );
}

type PropsType = {
    searchUsers: (term: string, friend: null | boolean) => void
}