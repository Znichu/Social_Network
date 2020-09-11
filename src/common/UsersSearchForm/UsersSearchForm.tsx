import React from 'react'
import {useFormik} from "formik";
import {MenuItem, Select} from "@material-ui/core";
import style from "./UsersSearchForm.module.css"
import {CustomButton} from "../CustomButton/CustomButton";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        '&:focus': {
            backgroundColor:'#fff'
        },
    },
    select: {
        color: '#818787',
        fontFamily: 'Montserrat',
        '&:before': {
            borderBottom: "none",
        },
        '&:after': {
            borderBottom: "none",
        },
        '&:hover': {
            borderBottom: 'none'
        }
    },
}));


export const UsersSearchForm: React.FC<PropsType> = (props) => {
    const usersSearchForm = useFormik({
        initialValues: {
            term: '',
            friend: 'null'
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
                    <div className={style.searchSelector}>
                        <Select
                            name='friend'
                            value={usersSearchForm.values.friend}
                            onChange={usersSearchForm.handleChange}
                            className={classes.select}
                            classes={{root: classes.root}}
                        >
                            <MenuItem value={" "} disabled>
                                Parameters
                            </MenuItem>
                            <MenuItem value={'null'}>All users</MenuItem>
                            <MenuItem value={'true'}>Only followed</MenuItem>
                            <MenuItem value={'false'}>Only unfollowed</MenuItem>
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