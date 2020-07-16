import React from "react";
import { connect } from "react-redux";
import { follow, requestUsers, unfollow } from "../../redux/users-reducer";
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
import {UserType} from "../../type/types";
import {RootState} from "../../redux/redux-store";
import {PageUsers} from "./Users";

type MapStatePropsType = {
    users: Array<UserType>
    totalCount: number
    totalPageCount: number
    currentPage: number
    isFetching: boolean
    followInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: ( id: number ) => void
    unfollow: ( id: number ) => void
    followingInProgress: () => void
    requestUsers: ( currentPage: number, totalPageCount: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.totalPageCount);
    }

    onPageClick = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.totalPageCount);
    };

    render() {
        return (
            <>
                { this.props.isFetching
                    ? <Preloader/>
                    : <PageUsers users={this.props.users}
                             unfollow={this.props.unfollow}
                             follow={this.props.follow}
                             totalCount={this.props.totalCount}
                             totalPageCount={this.props.totalPageCount}
                             currentPage={this.props.currentPage}
                             onPageClick={this.onPageClick}
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

let mapStateToProps = (state: RootState): MapStatePropsType => {
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
    connect(mapStateToProps, {follow, unfollow, requestUsers })
) (UsersContainer);

