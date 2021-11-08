import React from "react";
import {connect} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FormControls";
import {login} from "../../redux/auth-reducer";
import {requiredField} from "../../utils/validators";
import {Redirect} from "react-router-dom";
import {ReduxStateType} from "../../redux/redux-store";
import styles from "../../common/FormControls.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const Login: React.FC<MapDispatchToPropsType & MapStateToPropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
            props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to="/profile" />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field type="text" placeholder='Email' name="email" component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field type="password" placeholder='Password' name="password" component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field type="checkbox" name="rememberMe" component={Input} /> remember me
            </div>
            <div className={ props.error ? styles.formSummaryError : ""}>
                {props.error}
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

const mapStateToProps = (state: ReduxStateType) => ({
        isAuth: state.auth.isAuth
})

type MapStateToPropsType = {
    isAuth: boolean
}

const LoginReduxForm = reduxForm<FormDataType>({form: "login"})(LoginForm)

export default connect(mapStateToProps, {login})(Login)