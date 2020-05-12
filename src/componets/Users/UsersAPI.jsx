import React from "react";
import * as axios from "axios";
import Users from "./Users";

class UsersAPI extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.totalPageCount}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount)
            });
    }

    onPageClick = (p) => {
        this.props.setCurrentPage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.totalPageCount}`)
            .then(response => {const users = response.data.items; this.props.setUsers(users)});
    };

    render() {
        return (
            <Users users={this.props.users}
                   unsubscribe={this.props.unsubscribe}
                   follow={this.props.follow}
                   totalCount={this.props.totalCount}
                   totalPageCount={this.props.totalPageCount}
                   currentPage={this.props.currentPage}
                   onPageClick={this.onPageClick}
            />
        );
    }
}


export default UsersAPI;