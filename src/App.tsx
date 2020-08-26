import React, {Suspense} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {setInitialized} from "./redux/app-reducer";
import './App.css';
//components
import Navbar from "./components/Navbar/Navbar";
import MyPostsContainer from "./components/MyPosts/MyPostsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Preloader from "./common/Preloader/Preloader";
import Footer from "./components/Footer/Footer";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Friends} from "./components/Friends/Friends";
//types
import {RootState} from "./redux/redux-store";


// @ts-ignore
// const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
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
                        <HeaderContainer/>
                    </div>
                    <div className="col-lg-3">
                        <Navbar/>
                        <Friends />
                    </div>
                    <div className="col-lg-9">
                        <ProfileContainer/>
                        <div className="mainContent">
                            <Switch>
                                <Suspense fallback={<div>Загрузка...</div>}>
                                    <Route path="/" render={() => <Redirect to="/myposts"/>}/>
                                    <Route path="/myposts" render={() => <MyPostsContainer/>}/>
                                    <Route path="/dialogs" render={() => <Dialogs/>}/>
                                    <Route path="/users" render={() => <UsersContainer/>}/>
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
