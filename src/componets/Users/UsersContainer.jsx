import React from "react";
import {connect} from "react-redux";
import {
    follow,
    followingInProgress,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsFetching,
    unfollow
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.totalPageCount).then(data => {
                this.props.setUsers(data.items);
                this.props.toggleIsFetching(false);
                this.props.setTotalCount(data.totalCount)
            });
    }

    onPageClick = (p) => {
        this.props.setCurrentPage(p);
        this.props.toggleIsFetching(true);
            usersAPI.getUsers(p, this.props.totalPageCount).then(data => {
                const users = data.items;
                this.props.setUsers(users);
                this.props.toggleIsFetching(false);
            });
    };

    render() {
        return (
            <>
                { this.props.isFetching
                    ? <Preloader/>
                    : <Users users={this.props.users}
                             unfollow={this.props.unfollow}
                             follow={this.props.follow}
                             totalCount={this.props.totalCount}
                             totalPageCount={this.props.totalPageCount}
                             currentPage={this.props.currentPage}
                             onPageClick={this.onPageClick}
                             followingInProgress={this.props.followingInProgress}
                             followInProgress={this.props.followInProgress}
                    />
                }
            </>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalPageCount: state.usersPage.totalPageCount,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followInProgress: state.usersPage.followInProgress
    }
};

export default connect(mapStateToProps,
    {follow, unfollow, setUsers, setCurrentPage, setTotalCount,toggleIsFetching, followingInProgress })(UsersContainer);
