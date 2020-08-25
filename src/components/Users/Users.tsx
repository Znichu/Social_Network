import React from "react";
import style from "./Users.module.css";
import {UserType} from "../../type/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {UserCard} from "./UserCard";
//material-ui
import {createStyles, makeStyles} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);


type PropsType = {
    users: Array<UserType>
    followInProgress: Array<number>
    totalCount: number
    totalPageCount: number
    currentPage: number
    unfollow: (id: number) => void
    follow: (id: number) => void
    onPageClick: (page: number) => void
    searchUsers: (term: string, friend: null | boolean) => void
}


export const PageUsers: React.FC<PropsType> = (props) => {

    const classes = useStyles();

    let user = props.users.map(u => <UserCard id={u.id}
                                              status={u.status}
                                              followed={u.followed}
                                              name={u.name}
                                              followInProgress={props.followInProgress}
                                              photos={u.photos}
                                              follow={props.follow}
                                              unfollow={props.unfollow}
                                              key={u.id}/>
    );


    let pageCounter = Math.ceil(props.totalCount / props.totalPageCount);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        props.onPageClick(value);
    }

    return (
        <div className="container">
            <div className="row">
                <div className={style.paginationWrapper}>
                    <div className={classes.root}>
                        <Pagination count={pageCounter} page={props.currentPage} onChange={handleChange} color="primary"
                                    shape="rounded"/>
                    </div>
                    <UsersSearchForm searchUsers={props.searchUsers}/>
                </div>
                {user}
            </div>
        </div>
    );
}