import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Music} from './components/Music/Music';
import {Navbar} from './components/Navbar/Navbar';
import {News} from './components/News/News';
import {Settings} from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";


function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
