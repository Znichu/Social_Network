import React from "react";
import style from "./Users.module.css";
import {UsersSearchForm} from "../../common/UsersSearchForm/UsersSearchForm";
import {UserCard} from "./UserCard/UserCard";
//material-ui
import {LinearProgress, makeStyles} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowInProgress,
    getIsFetching,
    getTotalCount,
    getTotalPageCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {changeFilterAndRequestUsers, follow, unfollow} from "../../redux/users-reducer";
import {Loading} from "../../common/Loading/Loading";


const useStyles = makeStyles({
    root: {
        color: '#FE6B8B',
    }
});


export const Users: React.FC = () => {

    const users = useSelector(getUsers)
    const followInProgress = useSelector(getFollowInProgress)
    const totalCount = useSelector(getTotalCount)
    const totalPageCount = useSelector(getTotalPageCount)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getUsersFilter)
    const isFetching = useSelector(getIsFetching)

    const dispatch = useDispatch()

    const classes = useStyles();

    const searchUsers = (term: string, friend: null | boolean) => {
        dispatch(changeFilterAndRequestUsers(1, totalPageCount, term, friend));
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const {term, friend} = filter;
        dispatch(changeFilterAndRequestUsers(value, totalPageCount, term, friend));
    }

    const changeFollow = (userId: number) => {
        dispatch(follow(userId))
    }

    const changeUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    let user = users.map(u => <UserCard id={u.id}
                                        status={u.status}
                                        followed={u.followed}
                                        name={u.name}
                                        followInProgress={followInProgress}
                                        photos={u.photos}
                                        follow={changeFollow}
                                        unfollow={changeUnfollow}
                                        key={u.id}/>
    );


    let pageCounter = Math.ceil(totalCount / totalPageCount);

    return (
        <div className={style.usersContainer}>
            <div className={style.usersHeader}>
                <UsersSearchForm searchUsers={searchUsers}/>
            </div>
            <div className={style.mainContainer}>
                {isFetching ? <Loading/> : user}
            </div>
            <div className={style.paginationWrapper}>
                <div className={classes.root}>
                    <Pagination count={pageCounter} page={currentPage} onChange={handleChange} color="primary"
                                shape="rounded"/>
                </div>
            </div>
        </div>
    );
}