import React from "react";
import MyProfile from "./MyProfile";
import {MyPosts} from "../MyPosts/MyPosts";

export const ProfilePage = () => {
    return (
        <div>
            <MyProfile/>
            <MyPosts/>
        </div>

    );
}
