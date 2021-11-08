import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {ReduxStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsForRedirect = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: ReduxStateType): MapStateToPropsForRedirect => ({
    isAuth: state.auth.isAuth,
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsForRedirect) => {

        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={"/login"}/>

        return <Component {...restProps as T} />

    }

    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedRedirectComponent
}