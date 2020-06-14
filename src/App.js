import React, {Suspense} from 'react';
import {Route, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {setInitialized} from "./redux/app-reducer";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import MyPostsContainer from "./components/MyPosts/MyPostsContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Preloader from "./common/Preloader/Preloader";
import Footer from "./components/Footer/Footer";

const DialogsContainer = React.lazy(() => import('./components/Diologs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileUserContainer = React.lazy(() => import('./components/ProfileUser/ProfileUserContainer'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Setting = React.lazy(() => import('./components/Setting/Setting'));
const News = React.lazy(() => import('./components/News/News'));


class App extends React.Component {

    componentDidMount() {
        this.props.setInitialized();
    }

    render() {

        if (!this.props.initialize) {
            return <Preloader/>
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <HeaderContainer/>
                    </div>
                    <div className="col-lg-4">
                        <ProfileContainer/>
                        <Navbar/>
                        <FriendsContainer/>
                    </div>
                    <div className="col-lg-8">
                        <div className="mainContent">
                            <Suspense fallback={<div>Загрузка...</div>}>
                                <Route path="/myposts" render={() => <MyPostsContainer/>}/>
                                <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                                <Route path="/users" render={() => <UsersContainer/>}/>
                                <Route path="/profile/:userId" render={() => <ProfileUserContainer/>}/>
                                <Route path="/login" render={() => <Login/>}/>
                                <Route path="/news" render={() => <News/>}/>
                                <Route path="/music" render={() => <Music/>}/>
                                <Route path="/setting" render={() => <Setting/>}/>
                            </Suspense>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialize: state.app.initialize
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, {setInitialized})
)(App);
