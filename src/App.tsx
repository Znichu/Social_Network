import React, {Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setInitialized} from "./redux/app-reducer";
import './App.css';
//components
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Login} from "./components/Login/Login";
import {ProfilePage} from "./components/Profile/ProfilePage";
//types
import {RootState} from "./redux/redux-store";
import {LinearProgress} from "@material-ui/core";
import {WithAuthenticationRoute} from "./hoc/withAuthenticationRoute"
import {Loading} from "./common/Loading/Loading";


const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));
const Messages = React.lazy(() => import ("./components/Dialogs/Messages"));
const FriendsPage = React.lazy(() => import ("./components/Friends/FriendsPage/FriendsPage"));
const UserProfilePage = React.lazy(() => import('./components/ProfileUser/UserProfilePage'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Setting = React.lazy(() => import('./components/Setting/Setting'));
const News = React.lazy(() => import('./components/News/News'));


export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setInitialized())
    }, [])

    const initialize = useSelector((state: RootState) => state.app.initialize)
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    if (!initialize) {
        return <Loading/>
    }
    return (
        <>
            <div className="header">
                <Header/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        {isAuth && <Navbar/> }
                    </div>
                    <div className="col-lg-9">
                        <div className="mainContent">
                            <Switch>
                                <Suspense fallback={<div><LinearProgress/></div>}>
                                    <Route path="/" render={() => <Redirect to="/my-profile"/>}/>
                                    <WithAuthenticationRoute path="/my-profile" component={ProfilePage}/>
                                    <WithAuthenticationRoute path="/dialogs" component={Dialogs}/>
                                    <WithAuthenticationRoute path="/users" component={UsersPage}/>
                                    <WithAuthenticationRoute path='/all-friends' component={FriendsPage}/>
                                    <WithAuthenticationRoute path="/messages/:userId" component={Messages}/>
                                    <WithAuthenticationRoute path="/profile/:userId"
                                                             component={UserProfilePage}/>

                                    <Route path="/news" render={() => <News/>}/>
                                    <Route path="/music" render={() => <Music/>}/>
                                    <WithAuthenticationRoute path="/settings" component={Setting}/>
                                    <Route path="/login" render={() => <Login/>}/>
                                </Suspense>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

