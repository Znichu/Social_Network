import React from 'react'
import {useFormik} from "formik";
import {Button, Input, MenuItem, Select, withStyles} from "@material-ui/core";
import style from "./UsersSearchForm.module.css"

const ColorButton = withStyles(() => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#0063cc',
        '&:hover': {
            backgroundColor: '#0069d9',
        },
    },
}))(Button);


export const UsersSearchForm: React.FC<PropsType> = (props) => {
    const usersSearchForm = useFormik({
        initialValues: {
            term: '',
            friend: ''
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
                        <MenuItem value={'null'}>All</MenuItem>
                        <MenuItem value={'true'}>Only followed</MenuItem>
                        <MenuItem value={'false'}>Only unfollowed</MenuItem>
                    </Select>

                    <ColorButton
                        type="submit"
                        variant="contained"
                        size="small"
                    >
                        Search
                    </ColorButton>
                </div>
            </form>
        </>
    );
}

type PropsType = {
    searchUsers: (term: string, friend: null | boolean) => void
}