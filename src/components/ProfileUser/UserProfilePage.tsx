import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProfileUser from "./ProfileUser";
import {setProfile, setStatus} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {RootState} from "../../redux/redux-store";


const UserProfilePage: React.FC = () => {

    const dispatch = useDispatch();
    const {userId} = useParams();

    useEffect(() => {
        dispatch(setProfile(userId));
        dispatch(setStatus(userId));
    }, [userId]);

    const profile = useSelector((state: RootState) => state.profileUser.profile);
    const status = useSelector((state: RootState) => state.profileUser.status);

    return (
        <ProfileUser  profile={profile} status={status}/>
    );
}

export default UserProfilePage;
