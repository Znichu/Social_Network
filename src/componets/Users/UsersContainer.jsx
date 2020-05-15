import React from "react";
import {connect} from "react-redux";
import {follow, setCurrentPage, setTotalCount, setUsers, toggleIsFetching, unfollow} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.totalPageCount}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.toggleIsFetching(false);
                this.props.setTotalCount(response.data.totalCount)
            });
    }

    onPageClick = (p) => {
        this.props.setCurrentPage(p);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.totalPageCount}`)
            .then(response => {
                const users = response.data.items;
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
        isFetching: state.usersPage.isFetching
    }
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//
//         unsubscribe: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (numberPage) => {
//             dispatch(setCurrentPageAC(numberPage))
//         },
//         setTotalCount: (totalCount) => {
//             dispatch(setTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// };

export default connect(mapStateToProps,
    {follow, unfollow, setUsers, setCurrentPage, setTotalCount,toggleIsFetching })(UsersContainer);
