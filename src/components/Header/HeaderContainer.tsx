import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {ReduxStateType} from "../../redux/redux-store";

type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToProps

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchToProps = {
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return (
            <>
                <Header login={this.props.login} isAuth={this.props.isAuth} logout={this.props.logout}/>
            </>

        )
    }

}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

    export default connect(mapStateToProps, {logout})(HeaderContainer)