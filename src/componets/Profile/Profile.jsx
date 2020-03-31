import s from "./Profile.module.css";
import React from "react";


const Profile = () => {
    return(
        <div className={s.profile_card}>
            <img className={s.profile_photo}
                 src="https://avatars2.githubusercontent.com/u/23550189?s=400&v=4"
                 alt="" />
            <h5>Sergey Neplashov</h5>
            <ul className={s.my_profile}>
                <li>Date of Birth: 05.08.1991</li>
                <li>City: Slavgorod</li>
                <li>Education: GGU Skoriny</li>
                <li>Web site:</li>
            </ul>
        </div>
    );
}
export default Profile;