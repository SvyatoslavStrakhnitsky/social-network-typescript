import {connect} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";
import {
    follow,
    getUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow,
    UsersType
} from "../../redux/users-reducer";
import React, {ComponentType} from "react";
import {Users} from "./Users";
import {Preloader} from "../../common/Preloader";
import {compose} from 'redux';
import {
    getAllUsers,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount
} from "../../redux/users-selectors";


type MapStatePropsType = {
    users: UsersType[]
    usersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleFollowingProgress: (followingInProgress: [], userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

export class UsersAPI extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                    <Users onPageChange={this.onPageChange}
                           users={this.props.users}
                           usersCount={this.props.usersCount}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           follow={this.props.follow}
                           unfollow={this.props.unfollow}
                           toggleFollowingProgress={this.props.toggleFollowingProgress}
                           followingInProgress={this.props.followingInProgress}
                    />
            </>

        )
    }
}


const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        users: getAllUsers(state),
        usersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers,
    })
)(UsersAPI)