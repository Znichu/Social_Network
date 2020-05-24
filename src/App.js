import React from 'react';
import './App.css';
import Navbar from "./componets/Navbar/Navbar";
import Profile from "./componets/Profile/Profile";
import News from "./componets/News/News";
import Music from "./componets/Music/Music";
import Setting from "./componets/Setting/Setting";
import {Route} from "react-router-dom";
import MyPostsContainer from "./componets/MyPosts/MyPostsContainer";
import DialogsContainer from "./componets/Diologs/DialogsContainer";
import FriendsContainer from "./componets/Friends/FriendsContainer";
import UsersContainer from "./componets/Users/UsersContainer";
import ProfileUserContainer from "./componets/ProfileUser/ProfileUserContainer";
import HeaderContainer from "./componets/Header/HeaderContainer";
import Login from "./componets/Login/Login";


const App = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <HeaderContainer />
                </div>
                <div className="col-lg-4">
                    <Profile/>
                    <Navbar/>
                    <FriendsContainer />
                </div>
                <div className="col-lg-8">
                    <div className="mainContent">
                        <Route path="/myposts" render={ () => <MyPostsContainer /> }/>
                        <Route path="/dialogs" render={ () => <DialogsContainer /> }/>
                        <Route path="/users" render={ () => <UsersContainer /> }/>
                        <Route path="/profile/:userId" render={ () => <ProfileUserContainer />}/>
                        <Route path="/login" render={ () => <Login /> }/>
                        <Route path="/news" component={News}/>
                        <Route path="/music" component={Music}/>
                        <Route path="/setting" component={Setting}/>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
