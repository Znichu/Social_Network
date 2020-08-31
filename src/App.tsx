import React, {Suspense} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {setInitialized} from "./redux/app-reducer";
import './App.css';
//components
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {FriendsBlock} from "./components/Friends/FriendsBlock/FriendsBlock";
import {Login} from "./components/Login/Login";
import {ProfilePage} from "./components/Profile/ProfilePage";
import Preloader from "./common/Preloader/Preloader";
import Footer from "./components/Footer/Footer";
//types
import {RootState} from "./redux/redux-store";
import {LinearProgress} from "@material-ui/core";
import {WithAuthenticationRoute} from "./hoc/withAuthenticationRoute"



const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));
const Messages = React.lazy(() => import ("./components/Dialogs/Messages"));
const FriendsPage = React.lazy(() => import ("./components/Friends/FriendsPage/FriendsPage"));
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
            return <LinearProgress />
        }

        return (
            <div className=" container">
                <div className="row">
                    <div className="col-lg-12">
                        <Header/>
                    </div>
                    <div className="col-lg-3">
                        <Navbar/>
                        <FriendsBlock />
                    </div>
                    <div className="col-lg-9">
                        <div className="mainContent">
                            <Switch>
                                <Suspense fallback={<div><LinearProgress/></div>}>
                                    <Route path="/" render={() => <Redirect to="/myprofile"/>}/>
                                    <WithAuthenticationRoute path={'/myprofile'} component={ProfilePage} />
                                    <WithAuthenticationRoute path="/dialogs" component={Dialogs} />
                                    <WithAuthenticationRoute path="/users" component={UsersPage} />
                                    <WithAuthenticationRoute path='/allfriends' component={FriendsPage} />
                                    <WithAuthenticationRoute path="/messages/:id" component={Messages} />
                                    <WithAuthenticationRoute path="/profile/:userId" component={ProfileUserContainer} />
                                    <Route path="/login" render={() => <Login/>}/>
                                    <Route path="/news" render={() => <News/>}/>
                                    <Route path="/music" render={() => <Music/>}/>
                                    <WithAuthenticationRoute path="/setting" component={Setting} />
                                </Suspense>
                            </Switch>
                        </div>
                    </div>
                </div>
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
