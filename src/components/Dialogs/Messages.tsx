import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getMessagesFriend} from "../../redux/messages-reducer";
import { useParams } from "react-router";




const Messages = () => {
    // const {id} = useParams();
    const dispatch = useDispatch();

     useEffect( () => {
       debugger
        dispatch(getMessagesFriend(6194))
     }, []);

    return (
        <span>hello</span>
    )
}

export default Messages
