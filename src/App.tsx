import React, {Suspense} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {setInitialized} from "./redux/app-reducer";
import './App.css';
//components
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Friends} from "./components/Friends/Friends";
import {Login} from "./components/Login/Login";
import {ProfilePage} from "./components/Profile/ProfilePage";
import Preloader from "./common/Preloader/Preloader";
import Footer from "./components/Footer/Footer";
//types
import {RootState} from "./redux/redux-store";



const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));
const Messages = React.lazy(() => import ("./components/Dialogs/Messages"));
// @ts-ignore
const ProfileUserContainer = React.lazy(() => import('./components/ProfileUser/ProfileUserContainer'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Setting = React.lazy(() => import('./components/Setting/Setting'));
const News = React.lazy(() => import('./components/News/News'));


type PropsType = {
    initialize: boolean
    setInitialized: () => void
}

class App extends React.Component<PropsType> {

    componentDidMount() {
        this.props.setInitialized();
    }

    render() {

        if (!this.props.initialize) {
            return <Preloader/>
        }

        return (
            <div className=" container">
                <div className="row">
                    <div className="col-lg-12">
                        <Header/>
                    </div>
                    <div className="col-lg-3">
                        <Navbar/>
                        <Friends />
                    </div>
                    <div className="col-lg-9">
                        <div className="mainContent">
                            <Switch>
                                <Suspense fallback={<div>Загрузка...</div>}>
                                    <Route path="/" render={() => <Redirect to="/myprofile"/>}/>
                                    <Route path="/myprofile" render={() => <ProfilePage/>}/>
                                    <Route path="/dialogs" render={() => <Dialogs/>}/>
                                    <Route path="/users" render={() => <UsersPage/>}/>
                                    <Route path="/messages/:id" render={() => <Messages/>}/>
                                    <Route path="/profile/:userId" render={() => <ProfileUserContainer/>}/>
                                    <Route path="/login" render={() => <Login/>}/>
                                    <Route path="/news" render={() => <News/>}/>
                                    <Route path="/music" render={() => <Music/>}/>
                                    <Route path="/setting" render={() => <Setting/>}/>
                                </Suspense>
                            </Switch>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

let mapStateToProps = (state: RootState) => {
    return {
        initialize: state.app.initialize,
    }
};

export default compose( withRouter, connect(mapStateToProps, { setInitialized }) )(App);
