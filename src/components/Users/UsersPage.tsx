import React, {useEffect} from "react";
import {Users} from "./Users";
import {useDispatch, useSelector} from "react-redux";
import {changeFilterAndRequestUsers} from "../../redux/users-reducer";
import {getCurrentPage, getTotalPageCount} from "../../redux/users-selectors";


const UsersPage = () => {

    const dispatch = useDispatch()

    const currentPage = useSelector(getCurrentPage)
    const totalPageCount = useSelector(getTotalPageCount)

    useEffect(() => {
        dispatch(changeFilterAndRequestUsers(currentPage, totalPageCount, "", null))
    }, [])

    return (
        <Users/>
    );
}
export default UsersPage




