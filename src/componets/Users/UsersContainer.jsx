import React from "react";
import { connect } from "react-redux";
import { follow, followingInProgress, getUsers, unfollow } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {withRedirect} from "../../hoc/hoc";



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

let Redirect = withRedirect(UsersContainer);

export default connect(mapStateToProps, {follow, unfollow, followingInProgress, getUsers })(Redirect);
