import React, {ComponentType} from 'react'
import {Profile} from './Profile'
import {connect} from 'react-redux';
import {ReduxStateType} from '../../redux/redux-store';
import {getStatus, getUserProfile, ProfileUserType, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from 'redux';


class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {

        let userId = this.props.match.params.userId

        if (!userId && this.props.authorizedUserId) {
            userId = this.props.authorizedUserId.toString()
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidUpdate(prevProps: ProfilePropsType, prevState: ProfilePropsType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <main className='content'>
                <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </main>
        )
    }
}

type PathParamsType = {
    userId: string
}

type MapStatePropsType = {
    profile: null | ProfileUserType | undefined
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: string | number) => void
    getStatus: (userId: string | number) => void
    updateStatus: (status: string) => void
}

type ProfilePropsType = MapStatePropsType & mapDispatchToPropsType & RouteComponentProps<PathParamsType>

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

