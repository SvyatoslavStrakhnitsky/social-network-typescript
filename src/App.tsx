import React, { Suspense } from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Route} from 'react-router-dom';
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {initializeApp} from "./redux/app-reducer";
import {ReduxStateType} from "./redux/redux-store";
import {Preloader} from "./common/Preloader";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

type AppPropsType = {
    initializeApp: () => void
} & mapStateToPropsType

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() =>
                        <Suspense fallback={<Preloader/>}>
                            <DialogsContainer/>
                        </Suspense>
                    }/>
                    <Route path='/users' render={() => <Suspense fallback={<Preloader/>}>
                            <UsersContainer/>
                        </Suspense>
                    }/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

type mapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: ReduxStateType) => ({
    initialized: state.app.initialized
})


export default connect(mapStateToProps, {initializeApp})(App)
