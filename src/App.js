import React from 'react';
import './App.css';
import Header from "./componets/Header/Header";
import Navbar from "./componets/Navbar/Navbar";
import Profile from "./componets/Profile/Profile";
import Dialogs from "./componets/Diologs/Dialogs";
import News from "./componets/News/News";
import Music from "./componets/Music/Music";
import Setting from "./componets/Setting/Setting";
import {Route} from "react-router-dom";
import Friends from "./componets/Friends/Friends";
import MyPostsContainer from "./componets/MyPosts/MyPostsContainer";
import DialogsContainer from "./componets/Diologs/DialogsContainer";
import FriendsContainer from "./componets/Friends/FriendsContainer";
import UsersContainer from "./componets/Users/UsersContainer";


const App = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <Header/>
                </div>
                <div className="col-lg-4">
                    <Profile/>
                    <Navbar/>
                    <FriendsContainer />
                </div>
                <div className="col-lg-8">
                    <div className="mainContent">
                        <Route path="/myposts" render={() => <MyPostsContainer />}/>
                        <Route path="/dialogs" render={() => <DialogsContainer />}/>
                        <Route path="/users" render={() => <UsersContainer />}/>
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
