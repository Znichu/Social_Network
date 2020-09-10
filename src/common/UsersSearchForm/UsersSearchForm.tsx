import React from 'react'
import {useFormik} from "formik";
import {MenuItem, Select} from "@material-ui/core";
import style from "./UsersSearchForm.module.css"
import {CustomButton} from "../CustomButton/CustomButton";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        color: '#818787',
        '&::before': {
            borderBottom: 'none',
        },
    },
}));


export const UsersSearchForm: React.FC<PropsType> = (props) => {
    const usersSearchForm = useFormik({
        initialValues: {
            term: '',
            friend: ' '
        },
        onSubmit: (values) => {
            const filter = {
                term: values.term,
                friend: values.friend === "null" ? null : values.friend === "true" ? true : false
            }
            props.searchUsers(filter.term, filter.friend);
            console.table(filter)
        },
    });

    const classes = useStyles();

    return (
        <>
            <form style={{width: "100%"}} onSubmit={usersSearchForm.handleSubmit}>
                <div className={style.formContainer}>
                    <div className={style.searchInput}>
                    <input placeholder="Enter name"
                           type="text"
                           name="term"
                           onChange={usersSearchForm.handleChange}
                           value={usersSearchForm.values.term}

                    />
                    </div>
{/*                    <Select
                        name='friend'
                        value={usersSearchForm.values.friend}
                        onChange={usersSearchForm.handleChange}
                    >
                        <MenuItem value={'null'}>all</MenuItem>
                        <MenuItem value={'true'}>only followed</MenuItem>
                        <MenuItem value={'false'}>only unfollowed</MenuItem>
                    </Select>*/}
                    <div className={style.searchSelector}>
                        <Select
                            name='friend'
                            value={usersSearchForm.values.friend}
                            onChange={usersSearchForm.handleChange}
                            classes={{root: classes.root}}
                        >
                            <MenuItem value={" "} disabled>
                                Parameters
                            </MenuItem>
                            <MenuItem value={'null'}>all</MenuItem>
                            <MenuItem value={'true'}>only followed</MenuItem>
                            <MenuItem value={'false'}>only unfollowed</MenuItem>
                        </Select>
                    </div>
                    <CustomButton title={'Search'}/>
                </div>
            </form>
        </>
    );
}

type PropsType = {
    searchUsers: (term: string, friend: null | boolean) => void
}