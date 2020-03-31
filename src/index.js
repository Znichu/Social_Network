import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import state, {subscribe} from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import {addMessage, addPost, updateMessageText, updatePostText} from "./redux/state";
import {BrowserRouter} from "react-router-dom";


let rerenderTree = (state) => {

    ReactDOM.render(
        < BrowserRouter>
            <App state={state} addPost={addPost} updatePostText={updatePostText}
                 addMessage={addMessage} updateMessageText={updateMessageText}/>
        </BrowserRouter>, document.getElementById('root'));

}

rerenderTree(state);

subscribe(rerenderTree);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
