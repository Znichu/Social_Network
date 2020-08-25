import React from "react";
import {connect} from "react-redux";
import {follow, changeFilterAndRequestUsers, unfollow} from "../../redux/users-reducer";
import Preloader from "../../common/Preloader/Preloader";
import {withRedirect} from "../../hoc/hoc";
import {compose} from "redux";
//selectors
import {
    getCurrentPage,
    getFollowInProgress,
    getIsFetching,
    getTotalCount,
    getTotalPageCount,
    getUsers, getUsersFilter
} from "../../redux/users-selectors";
import {UsersFilterType, UserType} from "../../type/types";
import {RootState} from "../../redux/redux-store";
import {PageUsers} from "./Users";

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.totalPageCount, "", null);
    }

    onPageClick = (pageNumber: number) => {
        const {term, friend} = this.props.filter;
        this.props.requestUsers(pageNumber, this.props.totalPageCount, term, friend);
    };

    searchUsers = (term: string, friend: null | boolean) => {
        this.props.requestUsers(1, this.props.totalPageCount, term, friend);
    }

    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <PageUsers users={this.props.users}
                                 unfollow={this.props.unfollow}
                                 follow={this.props.follow}
                                 totalCount={this.props.totalCount}
                                 totalPageCount={this.props.totalPageCount}
                                 currentPage={this.props.currentPage}
                                 onPageClick={this.onPageClick}
                                 followInProgress={this.props.followInProgress}
                                 searchUsers={this.searchUsers}
                    />
                }
            </>
        );
    }
}


let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        users: getUsers(state),
        totalPageCount: getTotalPageCount(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followInProgress: getFollowInProgress(state),
        filter: getUsersFilter(state)
    }
};

export default compose(
    withRedirect,
    connect(mapStateToProps, {follow, unfollow, requestUsers: changeFilterAndRequestUsers})
)(UsersContainer);


type MapStatePropsType = {
    users: Array<UserType>
    totalCount: number
    totalPageCount: number
    currentPage: number
    isFetching: boolean
    followInProgress: Array<number>
    filter: UsersFilterType
}

type MapDispatchPropsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: () => void
    requestUsers: (currentPage: number, totalPageCount: number, term: string, friend: null | boolean) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

