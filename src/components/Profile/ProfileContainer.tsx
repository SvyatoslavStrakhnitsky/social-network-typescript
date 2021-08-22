import React from 'react'
import {Profile} from './Profile'
import axios from "axios";
import { connect } from 'react-redux';
import { ReduxStateType } from '../../redux/redux-store';
import {ProfileUserType, setUserProfile} from "../../redux/profile-reducer";


class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <main className='content'>
                <Profile profile={this.props.profile}/>
            </main>
        )
    }
}

type MapStatePropsType = {
    profile: null | ProfileUserType | undefined
}

type mapDispatchToPropsType = {
    setUserProfile: (profile: null | ProfileUserType) => void
}

type ProfilePropsType = MapStatePropsType & mapDispatchToPropsType

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
    }
}

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)