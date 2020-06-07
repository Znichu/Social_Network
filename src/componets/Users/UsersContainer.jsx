import React from "react";
import { connect } from "react-redux";
import { follow, followingInProgress, requestUsers, unfollow } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {withRedirect} from "../../hoc/hoc";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowInProgress,
    getIsFetching,
    getTotalCount,
    getTotalPageCount,
    getUsers
} from "../../redux/users-selectors";



class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.totalPageCount);
    }

    onPageClick = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.totalPageCount);
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

//
// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         totalPageCount: state.usersPage.totalPageCount,
//         totalCount: state.usersPage.totalCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followInProgress: state.usersPage.followInProgress
//     }
// };

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalPageCount: getTotalPageCount(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followInProgress: getFollowInProgress(state)
    }
};

export default compose(
    withRedirect,
    connect(mapStateToProps, {follow, unfollow, followingInProgress, getUsers: requestUsers })
) (UsersContainer);

